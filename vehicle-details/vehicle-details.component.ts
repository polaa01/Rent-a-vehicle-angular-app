import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { VehicleService } from '../services/vehicle.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleStatus } from '../model/VehicleStatus';
import { Vehicle } from '../model/Vehicle';
import { MatTableDataSource } from '@angular/material/table';
import { Rental } from '../model/Rental';
import { RentalService } from '../services/rental.service';
import { Fault } from '../model/Fault';
import { FaultService } from '../services/fault.service';
@Component({
  selector: 'app-vehicle-details',
  standalone: false,
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent implements OnInit{

  //vehicle: any;
  vehicle: any;

  //rentals: any[] = [];
  //faults: any[] = [];

   statusLabels: { [key in VehicleStatus]: string } = {
      [VehicleStatus.AVAILABLE]: 'Available',
      [VehicleStatus.IN_REPAIR]: 'In repair',
      [VehicleStatus.RENTED]: 'Rented'
    };

    dataSourceRentals = new MatTableDataSource<any>();
    dataSourceFaults = new MatTableDataSource<any>();

    rentals: Rental[] = [];
    faults: Fault[] = [];

    displayedColumnsForRentals: string[]=[];
    displayedColumnsForFaults: string[]=[];
  
  type: string='';
  constructor(private location: Location, private vehicleService: VehicleService, private rentalService: RentalService, private faultService: FaultService, private route: ActivatedRoute)
  {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
    });

    this.vehicleService.getVehicleById(id).subscribe(data => {
      this.vehicle = data;
    
    });

    this.loadRentals(id);
    this.loadFaults(id);

    this.setColumnsForRentals();
    this.setColumnsForFaults();
  }

  goBack()
  {
     this.location.back();
  }




    
    
  

  loadRentals(id: number)
  {
      this.rentalService.getRentalsForVehicle(id).subscribe((data) => 
    {
      this.rentals=data;
      this.dataSourceRentals.data=this.rentals;
      //this.dataSource.paginator=this.paginator!;
    });
  }

  setColumnsForRentals()
  {
      this.displayedColumnsForRentals=['id', 'clientName', 'startPositionX', 'startPositionY', 'endPositionX', 'endPositionY', 'startTime', 'endTime' , 'duration', 'price'];
  }


    loadFaults(id: number)
  {
      this.faultService.getFaultsForVehicle(id).subscribe((data) => 
    {
      this.faults=data;
      this.dataSourceFaults.data=this.faults;
      //this.dataSource.paginator=this.paginator!;
    });
  }

  setColumnsForFaults()
  {
      this.displayedColumnsForFaults=['id', 'date', 'description', 'actions'];
  }



  deleteFault(id: number)
  {
    if(confirm('Are you sure you want to delete this fault?'))
    {
       this.faultService.deleteFault(id).subscribe({
        next: () => {
          alert('Fault successfully deleted!');
          this.loadFaults(id);
          
        },
        error: (err) => {
          alert('Error deleting fault: ' + err.message);
        }
      });
    }
  }



}
