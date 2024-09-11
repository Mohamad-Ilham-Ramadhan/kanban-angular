import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDropdownComponent } from './button-dropdown.component';

describe('ButtonDropdownComponent', () => {
  let component: ButtonDropdownComponent;
  let fixture: ComponentFixture<ButtonDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
