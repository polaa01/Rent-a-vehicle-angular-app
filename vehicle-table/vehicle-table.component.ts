import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../model/Vehicle';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleStatus } from '../model/VehicleStatus';


@Component({
  selector: 'app-vehicle-table',
  standalone: false,
  templateUrl: './vehicle-table.component.html',
  styleUrl: './vehicle-table.component.css'
})
export class VehicleTableComponent implements OnInit{
    
  @Input() type: string='';
  //dataSource: any[]=[];
  
  //dataSource: MatTableDataSource<Vehicle> = new MatTableDataSource<Vehicle>();

   dataSource = new MatTableDataSource<any>();
   @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[]=[];
  vehicles: Vehicle[]=[];

  cars: Vehicle[] = [];
  bikes: Vehicle[] = [];
  scooters: Vehicle[] = [];
  activeType: string = 'cars';

  showCreateForm = false;
  showVehicleDetails = false;
  selectedType: string='';

  selectedFile: File | null = null;

  /*
  statusLabels: { [key: string]: string } = {
    AVAILABLE: 'Available',
    IN_REPAIR: 'In repair',
    RENTED: 'Rented'
  };
  */

 


  constructor(private dialog: MatDialog, private vehicleService: VehicleService, private router: Router, 
    private route: ActivatedRoute)
    {}

  
  onTabChange(event: any) {
    const tabIndex = event.index;
    this.activeType = tabIndex === 0 ? 'cars' : tabIndex === 1 ? 'bikes' : 'scooters';
  }


  ngOnInit(): void {
    this.loadVehicles();
    this.setColumns();
  }


  setColumns(): void
  {
       this.displayedColumns=['id', 'model', 'purchasePrice', 'vehicleId', 'vehicleStatus'];

       if(this.type==='car')
       {
        this.displayedColumns.push('description','purchaseDate', 'actions');
       }

       else if(this.type==='bike')
        {
         this.displayedColumns.push('autonomy', 'actions');
        }

       else if(this.type==='scooter')
          {
           this.displayedColumns.push('maxSpeed', 'actions');
          }
  }

  loadVehicles()
  {
    if(this.type==='car')
    {
      this.vehicleService.getCars().subscribe((data) => 
      {
        this.vehicles=data;
        //this.dataSource=data;
        //this.dataSource.data = this.cars;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator!;
      });
        
    }

    else if(this.type==='bike')
      {
        this.vehicleService.getBikes().subscribe((data) =>
          {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator!;
          }); 
       
      }

     else if(this.type==='scooter')
        {
          this.vehicleService.getScooters().subscribe((data) =>
            {
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator!;
            });
        }
  }







deleteVehicle(id: number): void {
  this.vehicleService.deleteVehicle(id).subscribe(() => {
    this.loadVehicles();

  });
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return data.model.toLowerCase().startsWith(filter.toLowerCase());
  };

  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openCreateForm()
{
  this.selectedType=this.type;
  this.showCreateForm = true;
}

closeCreateForm()
{
  this.showCreateForm = false;
  this.loadVehicles();
}


onFileSelected(event: any) {
  const input = event.target as HTMLInputElement;
  if(input?.files?.length)
  {
    this.selectedFile = event.target.files[0];
  }
  
}

uploadFile()
{
  if(!this.selectedFile)
  {
    alert('Please select a file!');
    return;
  }

  const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.vehicleService.uploadCsv(this.type, formData).subscribe({
      next: response => {
        alert(`CSV uploaded successfully for ${this.type}`);
        this.loadVehicles();
      },
      error: error => {console.error(`Failed to upload CSV for ${this.type}`, error);}
    });

    //this.loadVehicles();
  }

  /*
  viewDetails(id: number)
  {
     this.router.navigate(['/admin/vehicle-details', id], { relativeTo: this.route});
     
  }
*/
  viewDetails(id: number) {
    this.router.navigate(
      ['/admin/vehicle-details', id],
      {
        queryParams: { type: this.type },
        relativeTo: this.route
      }
    );
  }









}
