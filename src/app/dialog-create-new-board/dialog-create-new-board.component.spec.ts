import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNewBoardComponent } from './dialog-create-new-board.component';

describe('DialogCreateNewBoardComponent', () => {
  let component: DialogCreateNewBoardComponent;
  let fixture: ComponentFixture<DialogCreateNewBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateNewBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
