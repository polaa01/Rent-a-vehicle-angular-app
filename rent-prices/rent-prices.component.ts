import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Vehicle } from '../model/Vehicle';
import { VehicleService } from '../services/vehicle.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rent-prices',
  standalone: false,
  templateUrl: './rent-prices.component.html',
  styleUrl: './rent-prices.component.css'
})
export class RentPricesComponent {

   rentPriceForm!: FormGroup;
    vehicles: Vehicle[]=[];
    @Output() cancel = new EventEmitter<void>();
  
  
    constructor(private fb: FormBuilder, private vehicleService: VehicleService)
    {
  
    }
  
    ngOnInit(): void {
  
      this.rentPriceForm = this.fb.group({
        
        rentPrice: ['', [Validators.required, Validators.min(100), Validators.max(5000)]],
        vehicleId: ['', Validators.required]
      });
  
    
      this.vehicleService.getAllVehicles().subscribe(vechicles => {
        this.vehicles = vechicles;
      }); 
    }


    onSubmit()
    {
      const vehicleId = this.rentPriceForm.value.vehicleId;
      const rentPrice = this.rentPriceForm.value.rentPrice;

      this.vehicleService.updateRentPrice(vehicleId, rentPrice).subscribe({
      next: () => {
        alert('Price set successfully!');
        this.rentPriceForm.reset();
      },
      error: err => alert('Failed to set price.')
    });
   }
    

    closeForm()
    {
      this.cancel.emit();
    }

}
