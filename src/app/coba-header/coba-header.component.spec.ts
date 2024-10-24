import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobaHeaderComponent } from './coba-header.component';

describe('CobaHeaderComponent', () => {
  let component: CobaHeaderComponent;
  let fixture: ComponentFixture<CobaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobaHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
