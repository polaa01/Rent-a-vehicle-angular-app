import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fault } from '../model/Fault';
import { FaultService } from '../services/fault.service';
import { VehicleService } from '../services/vehicle.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { Vehicle} from '../model/Vehicle';

@Component({
  selector: 'app-create-fault',
  standalone: false,
  templateUrl: './create-fault.component.html',
  styleUrl: './create-fault.component.css'
})
export class CreateFaultComponent implements OnInit{

  faultForm!: FormGroup;
  vehicles: Vehicle[]=[];
  @Output() cancel = new EventEmitter<void>();


  constructor(private fb: FormBuilder, private faultService: FaultService, private vehicleService: VehicleService)
  {

  }

  ngOnInit(): void {

    this.faultForm = this.fb.group({
      description: ['', Validators.required],
      dateReported: ['', Validators.required],
      vehicleId: ['', Validators.required]
    });

  
    this.vehicleService.getAllVehicles().subscribe(vechicles => {
      this.vehicles = vechicles;
    }); 
  }


onSubmit(): void {
    if (this.faultForm.valid) {
      
        const description = this.faultForm.value.description;
        //const dateReported = this.faultForm.value.dateReported;
        const dateReported = new Date(this.faultForm.value.dateReported);
        const vehicleId = this.faultForm.value.vehicleId;
      
      this.faultService.addFaultToVehicle(vehicleId, description, dateReported).subscribe({
        next: () => {
          alert('Fault successfully created!');
          this.faultForm.reset();
        },
        error: (err) => {
          alert('Error creating fault: ' + err.message);
        }
      });
    }
  }



     closeForm()
    {
      this.cancel.emit();
    }




}
