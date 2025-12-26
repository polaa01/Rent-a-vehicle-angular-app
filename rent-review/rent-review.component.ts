import { Component, OnInit, ViewChild } from '@angular/core';
import { Rental } from '../model/Rental';
import { RentalService } from '../services/rental.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rent-review',
  standalone: false,
  templateUrl: './rent-review.component.html',
  styleUrl: './rent-review.component.css'
})
export class RentReviewComponent implements OnInit {

  rentals: Rental[] = [];
  displayedColumns: string[] = [];
  
  rental: any;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private rentalService: RentalService)
  {

  }

  ngOnInit(): void {
    this.loadRentals();
    this.setColumns();
  }

  loadRentals()
  {
      this.rentalService.getAllRentals().subscribe((data) => 
    {
      this.rentals=data;
      this.dataSource.data=this.rentals;
      this.dataSource.paginator=this.paginator!;
    });
  }

  setColumns()
  {
      this.displayedColumns=['id', 'clientName', 'vehicleId', 'startPositionX', 'startPositionY', 'endPositionX', 'endPositionY', 'startTime', 'endTime' , 'duration', 'price'];
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return data.client.firstName.toLowerCase().startsWith(filter.toLowerCase());
  };

  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
