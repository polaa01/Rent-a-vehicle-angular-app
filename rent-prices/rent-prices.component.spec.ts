import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPricesComponent } from './rent-prices.component';

describe('RentPricesComponent', () => {
  let component: RentPricesComponent;
  let fixture: ComponentFixture<RentPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentPricesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
