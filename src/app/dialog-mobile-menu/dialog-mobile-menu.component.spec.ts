import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMobileMenuComponent } from './dialog-mobile-menu.component';

describe('DialogMobileMenuComponent', () => {
  let component: DialogMobileMenuComponent;
  let fixture: ComponentFixture<DialogMobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogMobileMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMobileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
