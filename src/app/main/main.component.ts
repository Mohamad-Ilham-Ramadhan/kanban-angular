import { ChangeDetectionStrategy, Component, ElementRef, inject, Inject, ViewChild, Renderer2, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule, AsyncPipe, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup,  FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateNewBoardComponent } from '../dialog-create-new-board/dialog-create-new-board.component';
import { DialogNewColumnComponent } from '../dialog-new-column/dialog-new-column.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
import { InputComponent } from '../input/input.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { SwitchThemeComponent } from '../switch-theme/switch-theme.component';

import { State } from '../reducers';
import { selectBoards, selectActiveBoard, selectCurrentBoard } from '../selectors/board.selector';
import { Column, Board, Task } from '../reducers/board.reducer';
import { setActiveBoard, swapTask } from '../actions/board.action';
import { toggleTheme } from '../actions/theme.action';

import { CountPipe } from '../pipes/count.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, CommonModule, AsyncPipe, InputComponent, FormsModule, ReactiveFormsModule, CountPipe, SwitchThemeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  @ViewChild('aside') asideEl!: ElementRef;
  @ViewChild('main') mainEl!: ElementRef;
  @ViewChild('mainScroll') mainScrollEl!: ElementRef;

  form: FormGroup;

  boards$ = new Observable<any>();
  activeBoard$ = new Observable();
  currentBoard$ = new Observable<Board>();
  columns: Column[] = [];
  dialogData: any;
  theme$ = new Observable<string>();
  theme: string = '';
  constructor(private store: Store<State>, private fb : FormBuilder, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {    
    this.form = this.fb.group({
      select: '1'
    });

    this.theme$ = store.select('theme');
    this.theme$.subscribe( val => this.theme = val);
    
    this.boards$ = store.select(selectBoards);
    this.activeBoard$ = store.select(selectActiveBoard);
    this.currentBoard$ = store.select(selectCurrentBoard);
    this.currentBoard$.subscribe( (cb: Board) => {
      this.columns = cb.columns;
      this.dialogData = {
        name: cb.name,
        columns: cb.columns
      }
    })
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  toggleSidebar() {
    this.mainEl.nativeElement.classList.toggle('hide');
  }

  chooseBoard(index: number) {
    this.store.dispatch(setActiveBoard({index}))
  }


  dialog = inject(MatDialog);
  openDialogNewBoard() {
    const dialogRef = this.dialog.open(DialogCreateNewBoardComponent, {
      width: '480px',
      height: `${document.documentElement.clientWidth <= 766 ? '100%' : 'auto'}`, 
    });
  }
  openDialogNewColumn() {
    const dialogRef = this.dialog.open(DialogNewColumnComponent, {
      width: '480px',
      height: `${document.documentElement.clientWidth <= 766 ? '100%' : 'auto'}`,
      data: this.dialogData
    });
  }
  
  openDialogTask(task: Task, columnIndex: number, taskIndex: number) {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      width: '480px',
      height: `${document.documentElement.clientWidth <= 766 ? '100%' : 'auto'}`,
      data: {task, columnIndex, taskIndex}
    });
  }

  scrolling(e: Event) {
    console.log('scrolling');
    const $this = e.currentTarget;
    document.documentElement.style.userSelect = 'none';
    // setScrolling(true)
    // setOverlay(true);
    function onDrag(e: MouseEvent) {
      // @ts-ignore
      $this.scrollLeft = $this.scrollLeft - e.movementX;
    }

    function onRelease() {
      // setScrolling(false);
      // setOverlay(false);
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', onRelease) 
      document.documentElement.style.userSelect = '';
    }

    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', onRelease)
  }


  dragDesktop(e: MouseEvent, task: Task, columnIndex: number, taskIndex: number) {
    e.stopPropagation();
    this.renderer.addClass(this.document.body, 'no-selection');
    console.log('taskIndex', taskIndex)
    // console.log('this.mainScrollEl', this.mainScrollEl.nativeElement);
    
    let dragged = false;
    let isOut = false;
    
    const $this = e.currentTarget as HTMLElement;
    const transitionDuration = parseFloat(window.getComputedStyle($this).transitionDuration) * 1000; // in ms
    this.renderer.removeClass($this, 'task-transition');
    this.renderer.setStyle($this, 'z-index', '1000');
    let $wrapper = $this.parentElement;
    const $initialWrapper = $this.parentElement;
    const marginBottom = window.parseInt(window.getComputedStyle($this).marginBottom);
    
    let fromIndex = Number($this.dataset['index']);
    let fromColumnIndex = Number(columnIndex);
    let toColumnIndex = Number(columnIndex);
    let movedCards = new Set([$this]);
    // create shadowRect
    const $thisRect = $this.getBoundingClientRect();
    const $shadowRect = document.createElement("div");

    $shadowRect.classList.add("shadow-rect");
    this.renderer.setStyle($shadowRect, 'height', `${$thisRect.height}px`);
    this.renderer.setStyle($shadowRect, 'width', `${$thisRect.width}px`);
    this.renderer.setStyle($shadowRect, 'position', `absolute`);
    this.renderer.setStyle($shadowRect, 'top', `${$thisRect.top}px`);
    this.renderer.setStyle($shadowRect, 'left', `${$thisRect.left}px`);
    this.renderer.setStyle($shadowRect, 'border-radius', `8px`);
    // this.renderer.setStyle($shadowRect, 'opacity', `.3`);

    document.body.appendChild($shadowRect);

    // scroll main board when dragging task [start]
    const $mainScroll = this.mainScrollEl.nativeElement;
    if ($mainScroll === null) return;

    const mainScrollMaxScrollRight: number = Math.floor($mainScroll.scrollWidth - $mainScroll.clientWidth);
    const mainScrollMaxScrollBottom: number = Math.floor($mainScroll.scrollHeight - $mainScroll.clientHeight);
    
    // let lastThisRectLeft = $this.getBoundingClientRect().left;
    // let lastThisRectRight = $this.getBoundingClientRect().right;

    const setScrollIntervalId = window.setInterval(() => {
      if (!dragged) return;
      // scroll when dragging out of frame (overflow mainboard) to scroll
      const $thisRect = $this.getBoundingClientRect()
      const $thisMatrix = new DOMMatrix(window.getComputedStyle($this).transform);
      const $mainScrollRect = $mainScroll.getBoundingClientRect();

      // if ($thisRect.left >= 300) lastThisRectLeft = 300;
      // if ($thisRect.right <= window.innerWidth) lastThisRectRight = window.innerWidth;
      
      if ($thisRect.left < $mainScrollRect.left && $mainScroll.scrollLeft > 0) {
        // scroll left
        $this.style.transform = `translate(${Math.ceil($thisMatrix.e - 2)}px, ${$thisMatrix.f}px)`
        $mainScroll.scrollLeft = Math.ceil($mainScroll.scrollLeft - 2);
        $shadowRect.style.left = `${parseInt($shadowRect.style.left) + 2}px`;
      }

      if ($thisRect.right > $mainScrollRect.right && $mainScroll.scrollLeft < mainScrollMaxScrollRight) {
        // scroll right
        $this.style.transform = `translate(${Math.floor($thisMatrix.e + 2)}px, ${$thisMatrix.f}px)`
        $mainScroll.scrollLeft = Math.ceil($mainScroll.scrollLeft + 2);
        $shadowRect.style.left = `${parseInt($shadowRect.style.left) - 2}px`;
      }
  
      if ($thisRect.bottom > ($mainScrollRect.bottom - 50) && $mainScroll.scrollTop < mainScrollMaxScrollBottom) {
        // Scroll bottom
        $this.style.transform = `translate(${$thisMatrix.e}px, ${Math.ceil($thisMatrix.f + 2)}px)`;
        $mainScroll.scrollTop = Math.ceil($mainScroll.scrollTop + 2);
        $shadowRect.style.top = `${parseInt($shadowRect.style.top) - 2}px`;
      }
  
      if ($thisRect.top < ($mainScrollRect.top + 50) && $mainScroll.scrollTop > 0) {
        // scroll top
        $this.style.transform = `translate(${$thisMatrix.e}px, ${Math.ceil($thisMatrix.f - 2)}px)`
        $mainScroll.scrollTop = Math.ceil($mainScroll.scrollTop - 2)
        $shadowRect.style.top = `${parseInt($shadowRect.style.top) + 2}px`;
      }
    }, 5)
    // scroll main board when dragging task [start]

    const dragCard = (e: MouseEvent) => {
      console.log('dragCard');
      dragged = true;

      // $this.style.opacity = "1";
      this.renderer.setStyle($this, 'opacity', '1')

      const matrix = new DOMMatrix(window.getComputedStyle($this).transform);

      $this.style.transform = `translate(${matrix.e + e.movementX}px, ${
        matrix.f + e.movementY
      }px)`;

      this.renderer.setStyle($this, 'translate', `translate(${matrix.e + e.movementX}px, ${matrix.f + e.movementY}px)`);

      if (isOut == false && $wrapper !== null) {
        const $wrapperRect = $wrapper.getBoundingClientRect();
        if (
          e.clientX > $wrapperRect.right ||
          e.clientX < $wrapperRect.left ||
          e.clientY < $wrapperRect.top ||
          e.clientY > $wrapperRect.bottom
        ) {
          // console.log('Keluar Wrapper');
          Array.from($wrapper.children).forEach(($el) => {
            if ($el instanceof HTMLElement) {
              if (Number($el.dataset['index']) <= Number($this.dataset['index']))
                return;
  
              $el.dataset['index'] = String(Number($el.dataset['index']) - 1);
  
              const destinationY =
                Number($el.dataset['destinationY']) -
                (marginBottom + $thisRect.height);
              $el.style.transform = `translate(0px, ${destinationY}px)`;
              $el.dataset['destinationY'] = String(destinationY);
  
              movedCards.add($el);

            }
          });

          const $temp = $wrapper;
          $temp.dataset['isAnimating'] = '1';
          window.setTimeout(() => {
            $temp.dataset['isAnimating'] = '0';
          }, transitionDuration);

          // $shadowRect.remove(); // <== ini harus dihapus

          isOut = true;
          $wrapper = null;
          console.log('isOut = true;', isOut)

        }

        const $swapCards = document
          .elementsFromPoint(e.clientX, e.clientY)
          .filter(($el) => {
            if ($el === $this) return false;
            return $el.classList.contains("task");
          }); 
        
        if (
          !!$swapCards.length &&
          !!$swapCards[0].getAnimations().length == false
        ) {
          const $swapCard = $swapCards[0] as HTMLElement;
          if (
            Number($this.dataset['index']) < Number($swapCard.dataset['index']) &&
            e.movementY > 0 && 
            $wrapper !== null
          ) {

            const min = Math.min(
              Number($this.dataset['index']),
              Number($swapCard.dataset['index'])
            );
            const max = Math.max(
              Number($this.dataset['index']),
              Number($swapCard.dataset['index'])
            );
            Array.from($wrapper.children).forEach(($el) => {
              if ($el instanceof HTMLElement) {
                if (
                  $el === $this ||
                  Number($el.dataset['index']) > max ||
                  Number($el.dataset['index']) < min
                )
                  return;
                $this.dataset['index'] = String(Number($this.dataset['index']) + 1);
                $el.dataset['index'] = String(Number($el.dataset['index']) - 1);
  
                $shadowRect.style.top = `${
                  $el.getBoundingClientRect().bottom - $thisRect.height
                }px`;
                $shadowRect.style.left = `${$el.getBoundingClientRect().left}px`;
  
                const destinationY =
                  Number($el.dataset['destinationY']) -
                  (marginBottom + $thisRect.height);
                $el.style.transform = `translate(0px, ${destinationY}px)`;
                $el.dataset['destinationY'] = String(destinationY);
  
                movedCards.add($el);
              }
            });
          } else if (
            Number($this.dataset['index']) > Number($swapCard.dataset['index']) &&
            e.movementY < 0 &&
            $wrapper !== null
          ) {

            const min = Math.min(
              Number($this.dataset['index']),
              Number($swapCard.dataset['index'])
            );
            const max = Math.max(
              Number($this.dataset['index']),
              Number($swapCard.dataset['index'])
            );
            let isFirst = false;
            Array.from($wrapper.children).forEach(($el) => {
              if ($el instanceof HTMLElement) {

                if (
                  $el === $this ||
                  Number($el.dataset['index']) > max ||
                  Number($el.dataset['index']) < min
                )
                  return;
  
                // swap vertical fix $shadowRect
  
                $this.dataset['index'] = String(Number($this.dataset['index']) - 1);
                $el.dataset['index'] = String(Number($el.dataset['index']) + 1);
  
                if (isFirst == false) {
                  $shadowRect.style.top = `${$el.getBoundingClientRect().top}px`;
                  $shadowRect.style.left = `${
                    $el.getBoundingClientRect().left
                  }px`;
                  isFirst = true;
                }
  
                const destinationY =
                  Number($el.dataset['destinationY']) +
                  (marginBottom + $thisRect.height);
                $el.style.transform = `translate(0px, ${destinationY}px)`;
                $el.dataset['destinationY'] = String(destinationY);
  
                movedCards.add($el);
              }
            });
          }
        }
        return;
      } // inside
      if (isOut) { // outside
        const $neoWrapper = document
          .elementsFromPoint(e.clientX, e.clientY)
          .find(($el) => {
            return $el.classList.contains("tasks-wrapper");
          }) as HTMLElement | undefined;

        if (!!$neoWrapper && $neoWrapper?.firstElementChild?.classList.contains('empty-column')) {
          // in to empty column
          console.log('into empty column');
          $wrapper = $neoWrapper;
          isOut = false;
          $shadowRect.style.top = `${$wrapper.getBoundingClientRect().top}px`;
          $shadowRect.style.left = `${$wrapper.getBoundingClientRect().left}px`;
          document.body.appendChild($shadowRect);

          $this.dataset['index'] = '0';
          toColumnIndex = Number($wrapper.dataset['columnIndex']);
          return;
        }

        if (!!$neoWrapper && Number($neoWrapper.dataset['isAnimating']) == 0) {
          console.log('inside new wrapper')
          toColumnIndex = Number($neoWrapper.dataset['columnIndex']);
          $wrapper = $neoWrapper;
          let isFirst = false;
          let isMoved = false;
          let $lastEl : HTMLElement | null = null;

          Array.from($wrapper.children).forEach(($el) => {
            if ($el === $this) return;

            const $elRect = $el.getBoundingClientRect();
            // if (e.clientY <= $elRect.bottom && !!$el.getAnimations().length == false) {
            if (e.clientY <= $elRect.bottom && $el instanceof HTMLElement) {
              isOut = false;
              isMoved = true;
              if (isFirst == false ) {
                isFirst = true;
                const diff =
                  new DOMMatrix(window.getComputedStyle($el).transform).f -
                  Number($el.dataset['destinationY']);
                $this.dataset['index'] = $el.dataset['index'];
                $shadowRect.style.top = `${$elRect.top - diff}px`;
                $shadowRect.style.left = `${$elRect.left}px`;
                document.body.appendChild($shadowRect);
              }

              $el.dataset['index'] = String(Number($el.dataset['index']) + 1);

              const destinationY =
                Number($el.dataset['destinationY']) +
                (marginBottom + $thisRect.height);
              $el.style.transform = `translate(0px, ${destinationY}px)`;
              $el.dataset['destinationY'] = String(destinationY);

              movedCards.add($el);
            }

            // if ($el instanceof HTMLElement) {$lastEl = $el};
            $lastEl = $el as HTMLElement;
          });


          if (isMoved == false) {
            // insert into last position in a new wrapper or when wrapper is empty of any card (new wrapper is initial wrapper)
            // $lastEl === null ? empty wrapper : last position;
            console.log('insert into last position');
            isOut = false;
            isMoved = true;

            // @ts-ignore
            $this.dataset['index'] = $lastEl === null ? '0' : String(Number($lastEl?.dataset['index']) + 1);

            const $wrapperRect = $wrapper.getBoundingClientRect();
            $shadowRect.style.left = `${$wrapperRect.left}px`;
            // @ts-ignore
            const top = $lastEl === null ? $wrapperRect.top - marginBottom : $lastEl.getBoundingClientRect().bottom + Number($lastEl.dataset['destinationY']) - new DOMMatrix(window.getComputedStyle($lastEl).transform).f;
            $shadowRect.style.top = `${top + marginBottom}px`;
            document.body.appendChild($shadowRect);
          }
        }
        return;
      } // Outside

    }
    const cancelDrag = (e: Event) => {
      this.document.body.classList.remove('no-selection');
      clearInterval(setScrollIntervalId);

      if (dragged === false) {
        this.openDialogTask(task, columnIndex, taskIndex)
      }

      if ($wrapper == null && $initialWrapper !== null) {
        console.log('outcast!')
        // if outside of wrapper when cancelDrag
        movedCards.forEach(($el) => {
          if ($this === $el) return
          $el.style.transform = ''
        })
  
        // reset cards.dataset['index']
        Array.from($initialWrapper.children).reduce((curIndex, $el) => {
          if ($el === $this || Number(($el as HTMLElement).dataset['index']) < fromIndex) return curIndex;
          ($el as HTMLElement).dataset['index'] = String(curIndex + 1)
          return curIndex + 1
        }, fromIndex)
        
        $shadowRect.style.top = `${$thisRect.top}px`;
        $shadowRect.style.left = `${$thisRect.left}px`;
        // document.body.appendChild($shadowRect)
      }
      
      this.renderer.addClass($this, 'task-transition');

      // back to $shadowRect or back to initial position
      const moveX = $this.getBoundingClientRect().x - $shadowRect.getBoundingClientRect().x;
      const moveY = $this.getBoundingClientRect().y - $shadowRect.getBoundingClientRect().y;
      const matrix = new DOMMatrix(window.getComputedStyle($this).transform);
      this.renderer.setStyle($this, 'transform', `translate(${matrix.e - moveX}px, ${matrix.f - moveY}px)`);
      this.renderer.setStyle($this, 'z-index', '');

      $shadowRect.remove();

      setTimeout(() => {
        // set translateY 0 to all moved cards
        this.store.dispatch(swapTask({
          fromColumnIndex,
          toColumnIndex: isOut ? fromColumnIndex : toColumnIndex,
          fromIndex,
          toIndex: isOut ? fromIndex : Number($this.dataset['index'])
        }));
        movedCards.forEach(($c) => {
          this.renderer.removeClass($c, 'task-transition');
          this.renderer.setStyle($c, 'transform', 'translate(0px, 0px)');
          $c.dataset['destinationY'] = '0';
          setTimeout(() => {
            this.renderer.addClass($c, 'task-transition');
          }, 10) // needed so no transition
        })
        if (isOut) $this.dataset['index'] = String(fromIndex);
      }, transitionDuration) // this setTimeout needs for dragged card get back to the position using transition

      
      document.removeEventListener("mousemove", dragCard);
      document.removeEventListener("mouseup", cancelDrag);
    }
    document.addEventListener("mousemove", dragCard);
    document.addEventListener("mouseup", cancelDrag);
  }

  dragMobile(task: Task, taskIndex: number, columnIndex: number , e: TouchEvent) {
    e.stopPropagation()
    // console.log('dragMobile event', e);

    let isDragged = false
  
    const $this = e.currentTarget as HTMLDivElement;
    const marginBottom = window.parseInt(window.getComputedStyle($this).marginBottom)
    let $wrapper = $this.parentElement;
    const $wrappers = Array.from(document.querySelectorAll('.tasks-wrapper'))
    const $initialWrapper = $this.parentElement;

    if (!!$initialWrapper === false) return
    
    const transitionDuration = parseFloat(window.getComputedStyle($this).transitionDuration) * 1000 // in ms
    let isOut = false // when the dragged card doesn't belong in any position

    this.renderer.setStyle($this, 'opacity', '1');
    this.renderer.removeClass($this, 'task-transition');
    this.renderer.setStyle($this, 'z-index', '100');
  
    // create shadowRect
    const $thisRect = $this.getBoundingClientRect()
    const $shadowRect = document.createElement('div');
    this.renderer.setStyle($shadowRect, 'height', `${$thisRect.height}px`);
    this.renderer.setStyle($shadowRect, 'width', `${$thisRect.width}px`);
    this.renderer.setStyle($shadowRect, 'position', 'absolute');
    this.renderer.setStyle($shadowRect, 'top', `${$thisRect.top}px`);
    this.renderer.setStyle($shadowRect, 'left', `${$thisRect.left}px`);
    this.renderer.setStyle($shadowRect, 'z-index', '100');
    document.body.appendChild($shadowRect)
  
    // let isDragged = false
    let fromIndex = Number($this.dataset['index'])
    // let $thisIndex = Number($this.dataset['index'])
    let fromColumnIndex = Number(columnIndex)
    let toColumnIndex = Number(columnIndex)
    let movedCards= new Set<HTMLElement>([$this])
    let prevTouch: Touch;
    const startStamp = Date.now()
    const holdToDrag = 150 // milliseconds hold to drag card-task
  
    const setBgTimeoutId = window.setTimeout(() => {
      this.renderer.setStyle($this, 'background-color', this.theme === 'dark' ? '#23242c' : '#e2e8f0')
      // setPreventMainScroll(true) 
    }, holdToDrag)
  
    const $mainScroll = this.mainScrollEl.nativeElement;
    if ($mainScroll === null) return;

    const mainScrollMaxScrollRight: number = Math.floor($mainScroll.scrollWidth - $mainScroll.clientWidth)
    const mainScrollMaxScrollBottom: number = Math.floor($mainScroll.scrollHeight - $mainScroll.clientHeight)
    
    let lastThisRectLeft = $this.getBoundingClientRect().left;
    let lastThisRectRight = $this.getBoundingClientRect().right;
    
    const setScrollIntervalId = window.setInterval(() => {
      if (!isDragged) return;
      // scroll when dragging out of frame
      const $thisRect = $this.getBoundingClientRect()
      const $thisMatrix = new DOMMatrix(window.getComputedStyle($this).transform)

      if ($thisRect.left >= 0) lastThisRectLeft = 0;
      if ($thisRect.right <= window.innerWidth) lastThisRectRight = window.innerWidth;
      
      if ($thisRect.left < 0 && $mainScroll.scrollLeft > 0) {
        // scroll left
        if ($thisRect.left >= lastThisRectLeft) {
          lastThisRectLeft = $thisRect.left;
          return;
        };
        $this.style.transform = `translate(${Math.ceil($thisMatrix.e - 3)}px, ${$thisMatrix.f}px)`
        $mainScroll.scrollLeft = Math.ceil($mainScroll.scrollLeft - 3)
      }

      if ($thisRect.right > window.innerWidth && $mainScroll.scrollLeft < mainScrollMaxScrollRight) {
        // scroll right
        if ($thisRect.right <= lastThisRectRight) {
          lastThisRectRight = $thisRect.right;
          return;
        };
        $this.style.transform = `translate(${Math.floor($thisMatrix.e + 3)}px, ${$thisMatrix.f}px)`
        $mainScroll.scrollLeft = Math.ceil($mainScroll.scrollLeft + 3)
      }
  
      if ($thisRect.bottom > window.innerHeight && $mainScroll.scrollTop < mainScrollMaxScrollBottom) {
        // Scroll bottom
        $this.style.transform = `translate(${$thisMatrix.e}px, ${Math.ceil($thisMatrix.f + 3)}px)`
        $mainScroll.scrollTop = Math.ceil($mainScroll.scrollTop + 3)
      }
  
      if ($thisRect.top < $mainScroll.getBoundingClientRect().top && $mainScroll.scrollTop > 0) {
        $this.style.transform = `translate(${$thisMatrix.e}px, ${Math.ceil($thisMatrix.f - 3)}px)`
        $mainScroll.scrollTop = Math.ceil($mainScroll.scrollTop - 3)
      }
    }, 5)
    // mobile drag feature
    const touchMove = (e: TouchEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('touchMove')

      if (!isDragged) {
        if (Date.now() - startStamp > holdToDrag) {
          isDragged = true
        } else {
          document.removeEventListener('touchmove', touchMove)
          document.removeEventListener('touchend', touchEnd)
          window.clearTimeout(setBgTimeoutId) // clear of card-task background and prevent main scroll
          window.clearInterval(setScrollIntervalId) // clear interval of scroll when dragging
          $shadowRect.remove()
        }
      }

      if (isDragged) {
        const touch = e.touches[0];

        let movementX: number = 0;
        let movementY: number = 0;
  
        if (prevTouch) {
          movementX = touch.pageX - prevTouch.pageX
          movementY = touch.pageY - prevTouch.pageY
  
          // drag $this card-task
          const matrix = new DOMMatrix(window.getComputedStyle($this).transform)
          this.renderer.setStyle($this, 'transform', `translate(${matrix.e + movementX}px, ${matrix.f + movementY}px)`);
        }

        prevTouch = touch;

        // Drag and sort/swap lies here!! [START]
        if (isOut == false && $wrapper !== null) {
          // console.log('inside'); 
          const $wrapperRect = $wrapper.getBoundingClientRect()
          if (
            touch.clientX > $wrapperRect.right ||
            touch.clientX < $wrapperRect.left ||
            touch.clientY < $wrapperRect.top ||
            touch.clientY > $wrapperRect.bottom
          ) {
            // out of wrapper
            console.log('out of wrapper'); 
            (Array.from($wrapper.children) as HTMLElement[]).forEach(($el: HTMLElement) => {
              if (Number($el.dataset['index']) <= Number($this.dataset['index'])) return
  
              $el.dataset['index'] = String(Number($el.dataset['index']) - 1)
  
              const destinationY = Number($el.dataset['destinationY']) - (marginBottom + $thisRect.height);
              this.renderer.setStyle($el, 'transform', `translate(0px, ${destinationY}px)`);
              $el.dataset['destinationY'] = String(destinationY)
  
              movedCards.add($el)
            })
  
            const $temp = $wrapper;
            $temp.dataset['isAnimating'] = '1';
            window.setTimeout(() => {
              $temp.dataset['isAnimating'] = '0'
            }, transitionDuration)
  
            $shadowRect.remove()
            isOut = true
            $wrapper = null
          }
  
          const $swapCards = document.elementsFromPoint(touch.clientX, touch.clientY).filter(($el) => {
            if ($el === $this) return false
            return $el.classList.contains('task');
          }) as HTMLElement[];

          if (!!$swapCards.length && !!$swapCards[0].getAnimations().length == false && $wrapper !== null) {
            const $swapCard = $swapCards[0]
            if (Number($this.dataset['index']) < Number(($swapCard as HTMLElement).dataset['index']) && movementY > 0) {
  
              const min = Math.min(Number($this.dataset['index']), Number(($swapCard as HTMLElement).dataset['index']));
              const max = Math.max(Number($this.dataset['index']), Number(($swapCard as HTMLElement).dataset['index']));
              (Array.from($wrapper.children) as HTMLElement[]).forEach(($el : HTMLElement) => {
                if (
                  $el === $this ||
                  Number(($el as HTMLElement).dataset['index']) > max ||
                  Number(($el as HTMLElement).dataset['index']) < min
                )
                  return
                $this.dataset['index'] = String(Number($this.dataset['index']) + 1)
                $el.dataset['index'] = String(Number($el.dataset['index']) - 1)
  
                this.renderer.setStyle($shadowRect, 'top', `${$el.getBoundingClientRect().bottom - $thisRect.height}px`);
                this.renderer.setStyle($shadowRect, 'left', `${$el.getBoundingClientRect().left}px`);
  
                const destinationY = Number($el.dataset['destinationY']) - (marginBottom + $thisRect.height);

                this.renderer.setStyle($el, 'transform', `translate(0px, ${destinationY}px)`);

                $el.dataset['destinationY'] = String(destinationY)
  
                movedCards.add($el)
              })
            } else if (
              Number($this.dataset['index']) > Number(($swapCard as HTMLElement).dataset['index']) &&
              movementY < 0
            ) {
  
              const min = Math.min(Number($this.dataset['index']), Number($swapCard.dataset['index']))
              const max = Math.max(Number($this.dataset['index']), Number($swapCard.dataset['index']))
              let isFirst = false;
              // @ts-ignore
              ([...$wrapper.children] as HTMLElement[]).forEach(($el: HTMLElement) => {
                if (
                  $el === $this ||
                  Number($el.dataset['index']) > max ||
                  Number($el.dataset['index']) < min
                )
                  return
  
                // swap vertical fix $shadowRect
  
                $this.dataset['index'] = String(Number($this.dataset['index']) - 1);
                $el.dataset['index'] = String(Number($el.dataset['index']) + 1);
  
                if (isFirst == false) {
                  this.renderer.setStyle($shadowRect, 'top', `${$el.getBoundingClientRect().top}px`);
                  this.renderer.setStyle($shadowRect, 'left', `${$el.getBoundingClientRect().left}px`);
                  isFirst = true
                }
  
                const destinationY = Number($el.dataset['destinationY']) + (marginBottom + $thisRect.height);
                this.renderer.setStyle($el, 'transform', `translate(0px, ${destinationY}px)`);
                $el.dataset['destinationY'] = String(destinationY)
  
                movedCards.add($el)
              })
            }
          }
          return
        } // INSIDE
  
        if (isOut) {
          // console.log('isOut')
          const $neoWrapper = document.elementsFromPoint(touch.clientX, touch.clientY).find(($el) => {
            return $el.classList.contains('tasks-wrapper')
            }) as HTMLElement | undefined
            
          // console.log('$neoWrapper', $neoWrapper, $neoWrapper !== undefined ? $neoWrapper.childElementCount : 0);
          // empty wrapper
          if ($neoWrapper !== undefined && $neoWrapper?.firstElementChild?.classList.contains('empty-column')) {
            console.log('to empty new wrapper');
            $wrapper = $neoWrapper;
            isOut = false;
            this.renderer.setStyle($shadowRect, 'top', `${$wrapper.getBoundingClientRect().top}px`);
            this.renderer.setStyle($shadowRect, 'left', `${$wrapper.getBoundingClientRect().left}px`);
            document.body.appendChild($shadowRect)
  
            $this.dataset['index'] = '0'
            toColumnIndex = Number($wrapper.dataset['columnIndex'])
            return
          }
          
          if (!!$neoWrapper && Number($neoWrapper.dataset['isAnimating']) == 0) {
            
            // console.log('new wrapper')
            toColumnIndex = Number($neoWrapper.dataset['columnIndex']);
            $wrapper = $neoWrapper;
            let isFirst = false;
            let isMoved = false; // isMoved === false it's mean that there is no cards that moved when dragged card enter the wrapper
            let $lastEl: null | HTMLElement = null;
  
            (Array.from($wrapper.children) as HTMLElement[]).forEach(($el: HTMLElement) => {
              if ($el === $this) return
              const $elRect = $el.getBoundingClientRect()

              if (touch.clientY <= $elRect.bottom) {
                isOut = false
                isMoved = true
                if (isFirst == false) {
                  isFirst = true
                  const diff = new DOMMatrix(window.getComputedStyle($el).transform).f - Number($el.dataset['destinationY']);
                  $this.dataset['index'] = $el.dataset['index'];
                  this.renderer.setStyle($shadowRect, 'top', `${$elRect.top - diff}px`);
                  this.renderer.setStyle($shadowRect, 'left', `${$elRect.left}px`);
                  document.body.appendChild($shadowRect)
                }
  
                $el.dataset['index'] = String(Number($el.dataset['index']) + 1)
  
                const destinationY = Number($el.dataset['destinationY']) + (marginBottom + $thisRect.height)
                this.renderer.setStyle($el, 'transform', `translate(0px, ${destinationY}px)`);
                $el.dataset['destinationY'] = String(destinationY)
  
                movedCards.add($el)
              }
  
              $lastEl = $el
            })
            
            // console.log('isMoved', isMoved);
  
            if (isMoved == false) {
              // insert into last position in a new wrapper or when wrapper is empty of any card (new wrapper is initial wrapper)
              // console.log('$lastEl', $lastEl)
              isOut = false
              isMoved = true
              $this.dataset['index'] = $lastEl === null ? '0' : String(Number(($lastEl as HTMLElement).dataset['index']) + 1)
  
              const $wrapperRect = $wrapper.getBoundingClientRect()
              $shadowRect.style.left = `${$wrapper.getBoundingClientRect().left}px`
              const top =
                $lastEl === null
                  ? $wrapperRect.top - marginBottom
                  : ($lastEl as HTMLElement).getBoundingClientRect().bottom +
                    Number(($lastEl as HTMLElement).dataset['destinationY']) -
                    new DOMMatrix(window.getComputedStyle($lastEl).transform).f
              this.renderer.setStyle($shadowRect, 'top', `${top + marginBottom}px`);
              document.body.appendChild($shadowRect)
            } else {
              // console.log('else $lastEl', $lastEl)
            }
          }
          return
        } // OUTSIDE
  
        // Drag and sort/swap lies here!! [END]
      }
    }
  
    const touchEnd = (e: globalThis.TouchEvent): void => {
      e.preventDefault()

      this.renderer.setStyle($this, 'background-color', '');
      this.renderer.setStyle($this, 'opacity', '');
      this.renderer.addClass($this, 'task-transition')

      window.clearTimeout(setBgTimeoutId)
      window.clearInterval(setScrollIntervalId)
  
      // setPreventDrag(true)
      // window.setTimeout(() => {
      //   setPreventDrag(false)
      // }, transitionDuration)
  
      document.removeEventListener('touchmove', touchMove)
      document.removeEventListener('touchend', touchEnd)
      // setPreventMainScroll(false)
  
      // open modal task automatically handled by @click handler
      if (isDragged == false) {
        this.openDialogTask(task, columnIndex, taskIndex)

        // open modal card
        // boardStore.setColumnAndTaskIndex(columnIndex, index)
        // dispatch(setActiveColumn(columnIndex))
        // dispatch(setActiveTask(taskIndex))
        // setModalTaskOpen(true)
        $shadowRect.remove()
        return
      }
  
  
      if ($wrapper == null) {
        // if outside of wrapper when cancelDrag
        movedCards.forEach(($el) => {
          if ($this === $el) return
          this.renderer.setStyle($el, 'transform', 'translate(0px, 0px)');
        });
  
        // reset cards.dataset['index']
        (Array.from($initialWrapper.children) as HTMLElement[]).reduce((curIndex: number, $el: HTMLElement) => {
          if ($el === $this || Number($el.dataset['index']) < fromIndex) return curIndex;
          $el.dataset['index'] = String(curIndex + 1);
          return curIndex + 1;
        }, fromIndex)
  
        this.renderer.setStyle($shadowRect, 'top', `${$thisRect.top}px`);
        this.renderer.setStyle($shadowRect, 'left', `${$thisRect.left}px`);
        document.body.appendChild($shadowRect)
      }
  
      // back to $shadowRect or back to initial position
      // New approach:
      const $toWrapper = $wrappers[isOut ? fromColumnIndex : toColumnIndex];
      this.renderer.setStyle($shadowRect, 'left', `${$toWrapper.getBoundingClientRect().left}px`);
      
      const moveX = $this.getBoundingClientRect().x - $shadowRect.getBoundingClientRect().x;
      const moveY = $this.getBoundingClientRect().y - $shadowRect.getBoundingClientRect().y;
      const matrix = new DOMMatrix(window.getComputedStyle($this).transform);

      this.renderer.setStyle($this, 'transform', `translate(${matrix.e - moveX}px, ${matrix.f - moveY}px)`);
      this.renderer.setStyle($this, 'z-index', '');
  
      $shadowRect.remove();
  
      // update store
      setTimeout(() => {
        // set translateY 0 to all moved cards
        this.store.dispatch(swapTask({
          fromColumnIndex,
          toColumnIndex: isOut ? fromColumnIndex : toColumnIndex,
          fromIndex,
          toIndex: isOut ? fromIndex : Number($this.dataset['index'])
        }));
        movedCards.forEach(($c) => {
          this.renderer.removeClass($c, 'task-transition');
          this.renderer.setStyle($c, 'transform', 'translate(0px, 0px)');
          $c.dataset['destinationY'] = '0';
          setTimeout(() => {
            this.renderer.addClass($c, 'task-transition');
          }, 20) // needed so no transition
        })
        if (isOut) $this.dataset['index'] = String(fromIndex);
      }, transitionDuration) // this setTimeout needs for dragged card get back to the position using transition

    }
    document.addEventListener('touchmove', touchMove, {passive: false})
    document.addEventListener('touchend', touchEnd)
  }
}
