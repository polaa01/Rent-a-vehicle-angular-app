import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerUpdateFormComponent } from './manufacturer-update-form.component';

describe('ManufacturerUpdateFormComponent', () => {
  let component: ManufacturerUpdateFormComponent;
  let fixture: ComponentFixture<ManufacturerUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturerUpdateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
