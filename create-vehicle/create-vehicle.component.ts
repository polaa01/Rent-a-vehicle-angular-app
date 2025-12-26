import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Vehicle } from '../model/Vehicle';
import { VehicleService } from '../services/vehicle.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ManufacturerService } from '../services/manufacturer.service';
@Component({
  selector: 'app-create-vehicle',
  standalone: false,
  templateUrl: './create-vehicle.component.html',
  styleUrl: './create-vehicle.component.css'
})
export class CreateVehicleComponent implements OnInit{
  

  @Input() type!: string;
  @Output() cancel = new EventEmitter<void>();

  manufacturers: any[] = [];
  statuses=['AVAILABLE', 'IN_REPAIR', 'RENTED'];
  
  createVehicleForm!: FormGroup;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private manufacturerService: ManufacturerService)
  {  
             this.createVehicleForm = this.fb.group({
               model: [''],
               price: [''],
               vehicleId: [''],
               status: [''],
               description: [''],
               purchaseDate: [''],
               autonomy: [''],
               maxSpeed: [''],
               manufacturerId: [''],
             }); 
              
  }

  
  ngOnInit() {
    this.manufacturerService.getManufacturers().subscribe((data) => {
      this.manufacturers = data;
    });
  }


  onSave()
  {
    if (this.createVehicleForm.valid) {
      const formData = this.createVehicleForm.value;
  
      let vehicleData: any = {
        model: formData.model,
        purchasePrice: formData.price,
        vehicleId: formData.vehicleId,
        status: formData.status,
        manufacturer: { id: formData.manufacturerId }

      
      };

      if (this.type === 'car') {
        vehicleData.description = formData.description;
        vehicleData.purchaseDate = formData.purchaseDate;
        this.vehicleService.createCar(vehicleData).subscribe(() => {
          //this.addToTable(newCar);
          this.onCancel();
        });
      }

      else if (this.type === 'bike') {
        vehicleData.autonomy = formData.autonomy;
        this.vehicleService.createBike(vehicleData).subscribe(() => {
          //this.addToTable(newBike);
          this.onCancel();
        });
  
      } 

      else if (this.type === 'scooter') {
        vehicleData.maxSpeed = formData.maxSpeed;
        
        this.vehicleService.createScooter(vehicleData).subscribe(() => {
          
          this.onCancel();
        });
  
      } 


  
     /*
      if (this.type === 'car') {
        
        this.vehicleService.createCar(this.createVehicleForm.value).subscribe(() => {
         
          this.onCancel();
        });
  
      }
       else if (this.type === 'bike') {
        
        this.vehicleService.createBike(this.createVehicleForm.value).subscribe(() => {
         
          this.onCancel();
        });
  
      } 
      else if (this.type === 'scooter') {
       
        this.vehicleService.createScooter(this.createVehicleForm.value).subscribe(() => {
          
          this.onCancel()
        });
      }
      */
      
    }
    
  }

  /*
  addToTable(): void {
    this.vehicleService.loadVehicles().subscribe((data) => {
      this.vehicles = data; // Ponovo postavljamo listu vozila
    });
  }
*/

  onCancel()
  {
    this.cancel.emit();
  }

}
