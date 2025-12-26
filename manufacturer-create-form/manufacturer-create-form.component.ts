import { Component, Output } from '@angular/core';
import { ManufacturerService } from '../services/manufacturer.service';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Manufacturer } from '../model/Manufacturer';
@Component({
  selector: 'app-manufacturer-create-form',
  standalone: false,
  templateUrl: './manufacturer-create-form.component.html',
  styleUrl: './manufacturer-create-form.component.css'
})
export class ManufacturerCreateFormComponent {
        
  @Output() close = new EventEmitter<void>();
  //dataSource: any[]=[];
  //manufacturers: Manufacturer[]=[];

  manufacturer = { name: '', address:'', country:'', phone:'', fax: '', email:'' };

  constructor(private manufacturerService: ManufacturerService) {}

  onSubmit() {
    if (!this.manufacturer.name.trim() ||
       !this.manufacturer.address?.trim() ||
       !this.manufacturer.country?.trim() ||
       !this.manufacturer.phone?.trim() ||
       !this.manufacturer.fax?.trim() ||
       !this.manufacturer.email?.trim()) 
       return;

    this.manufacturerService.createManufacturer(this.manufacturer).subscribe(() => {
      this.close.emit();
       
    });
  }

  closeForm() {
    this.close.emit();
  }

}
