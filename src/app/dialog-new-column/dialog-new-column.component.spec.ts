import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewColumnComponent } from './dialog-new-column.component';

describe('DialogNewColumnComponent', () => {
  let component: DialogNewColumnComponent;
  let fixture: ComponentFixture<DialogNewColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogNewColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogNewColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
