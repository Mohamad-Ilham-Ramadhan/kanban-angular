import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobaMainComponent } from './coba-main.component';

describe('CobaMainComponent', () => {
  let component: CobaMainComponent;
  let fixture: ComponentFixture<CobaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CobaMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
