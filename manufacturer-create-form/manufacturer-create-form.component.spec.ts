import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerCreateFormComponent } from './manufacturer-create-form.component';

describe('ManufacturerCreateFormComponent', () => {
  let component: ManufacturerCreateFormComponent;
  let fixture: ComponentFixture<ManufacturerCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturerCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
