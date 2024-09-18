import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobaCreateBoardComponent } from './coba-create-board.component';

describe('CobaCreateBoardComponent', () => {
  let component: CobaCreateBoardComponent;
  let fixture: ComponentFixture<CobaCreateBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobaCreateBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobaCreateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
