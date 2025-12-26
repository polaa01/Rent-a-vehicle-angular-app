import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManufacturerService } from '../services/manufacturer.service';
import { Manufacturer } from '../model/Manufacturer';
@Component({
  selector: 'app-manufacturer-update-form',
  standalone: false,
  templateUrl: './manufacturer-update-form.component.html',
  styleUrl: './manufacturer-update-form.component.css'
})
export class ManufacturerUpdateFormComponent {

  @Output() cancel = new EventEmitter<void>();
  @Input() manufacturer: Manufacturer | null = null;
  @Output() save = new EventEmitter<Manufacturer>();

   
   manufacturerForm!: FormGroup;
    constructor(private manufacturerService: ManufacturerService, private fb: FormBuilder)
     {
      this.manufacturerForm = this.fb.group({
        id: [null],
        name: [''],
        country: [''],
        address: [''],
        phone: [''],
        email: [''],
        fax: ['']
      });
     }




ngOnChanges()
{
  if(this.manufacturer)
  {
    this.manufacturerForm.patchValue(this.manufacturer);
  }
}

  onSave()
  {

    if(this.manufacturerForm.valid)
      {
        this.save.emit(this.manufacturerForm.value);
      } 
   


  }

  onCancel()
  {  
    this.cancel.emit();
  }

}
