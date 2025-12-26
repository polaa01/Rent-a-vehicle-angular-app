import { Component, OnInit, ViewChild } from '@angular/core';
import { Manufacturer } from '../model/Manufacturer';
import { ManufacturerService } from '../services/manufacturer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ManufacturerCreateFormComponent } from '../manufacturer-create-form/manufacturer-create-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-manufacturers',
  standalone: false,
  templateUrl: './admin-manufacturers.component.html',
  styleUrl: './admin-manufacturers.component.css'
})
export class AdminManufacturersComponent implements OnInit{

  manufacturers: Manufacturer[] = [];
  displayedColumns: string[] = [];
 

  selectedManufacturer: Manufacturer | null = null;

  //dataSource: any[] = [];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  showForm = false;
  showUpdateForm = false;
  
  constructor(private manufacturerService: ManufacturerService, private snackBar: MatSnackBar)
  { }

 ngOnInit(): void {
  this.loadManufacturers();
  this.setColumns();

 }


 deleteManufacturer(id: number): void {
  this.manufacturerService.deleteManufacturer(id).subscribe(() => {
    this.loadManufacturers();

    this.snackBar.open('Manufacturer has been deleted successfully!', 'Close', {
      duration: 4000,
    });
  }, error => {
    this.snackBar.open('Error occured while trying to delete!', 'Close', {
      duration: 4000,
    });

  });
}


loadManufacturers()
{
  this.manufacturerService.getManufacturers().subscribe((data) => 
    {
      this.manufacturers=data;
      //this.dataSource=data;
      this.dataSource.data=this.manufacturers;
      this.dataSource.paginator=this.paginator!;
    });
}

setColumns()
{
  this.displayedColumns=['id', 'name', 'country', 'phone', 'address', 'fax', 'email', 'actions'];
}

openManufacturerForm()
{
   this.showForm = true;

}


closeManufacturerForm()
{
  this.showForm = false;
  this.loadManufacturers();
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return data.name.toLowerCase().startsWith(filter.toLowerCase());
  };

  this.dataSource.filter = filterValue.trim().toLowerCase();
}

editManufacturer(manufacturer: any)
{
  /*this.showUpdateForm=true;
  this.selectedManufacturer=manufacturer;*/
  this.selectedManufacturer = { ...manufacturer };
  this.showUpdateForm = true;
}

onSave(updatedManufacturer: Manufacturer)
{

  this.manufacturerService.updateManufacturer(updatedManufacturer).subscribe(() => {
    this.showUpdateForm = false;
    this.loadManufacturers();
  });

}

closeUpdateForm()
{
  this.showUpdateForm=false;
}





}





