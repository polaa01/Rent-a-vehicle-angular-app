import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaultComponent } from './create-fault.component';

describe('CreateFaultComponent', () => {
  let component: CreateFaultComponent;
  let fixture: ComponentFixture<CreateFaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateFaultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
