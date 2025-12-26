import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentReviewComponent } from './rent-review.component';

describe('RentReviewComponent', () => {
  let component: RentReviewComponent;
  let fixture: ComponentFixture<RentReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
