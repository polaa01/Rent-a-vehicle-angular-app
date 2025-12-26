import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core'
import {Chart, registerables} from 'chart.js';
import { RentalService } from '../services/rental.service';
import { FaultService } from '../services/fault.service';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements AfterViewInit, OnInit{

  
  @ViewChild('chart1') chart1Ref!: ElementRef;
  @ViewChild('chart2') chart2Ref!: ElementRef;
  @ViewChild('chart3') chart3Ref!: ElementRef;

  chart1!:Chart;
  chart2!:Chart;
  chart3!:Chart;

  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();

  months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  years = [2022, 2023, 2024, 2025];

  constructor(private rentalService: RentalService, private faultService: FaultService){}
 ngOnInit(): void {
   Chart.register(...registerables);
 }
  ngAfterViewInit(): void {
    this.createEmptyCharts();
    this.fillCharts();
  }
    //Chart.register(...registerables);

    //const ctx1 = this.chart1Ref.nativeElement.getContext('2d');
    //const ctx2 = this.chart2Ref.nativeElement.getContext('2d');
    //const ctx3 = this.chart3Ref.nativeElement.getContext('2d');
/*
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['01.06.', '02.06.', '03.06.', '04.06.'],
        datasets: [
          {
            label: 'Total revenues',
            data: [120, 180, 75, 200],
            backgroundColor: '#42A5F5',
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total revenue per days',
          },
        },
      },
    });

     new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['01.06.', '02.06.', '03.06.', '04.06.'],
        datasets: [{
          label: 'Number of faults',
          data: [50, 65, 70, 90],
          borderColor: '#66BB6A',
          
          backgroundColor: '#42A5F5'
        
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Number of faults per vehicle' }
        },
      },
    });


    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: ['Car', 'Bike', 'Scooter'],
        datasets: [{
          label: 'Total revenue',
          data: [40, 30, 30],
          //backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          backgroundColor: '#42A5F5'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          title: { display: true, text: 'Total revenue per vehicle type' }
        },
      },
    });

  }
*/


  createEmptyCharts()
  {
      this.chart1 = new Chart(this.chart1Ref.nativeElement.getContext('2d'),
      {
          type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Total revenues',
            data: [],
            backgroundColor: '#42A5F5',
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total revenue per days',
          },
        },
      },
      });


   this.chart2 = new Chart(this.chart2Ref.nativeElement.getContext('2d'),
   {
    type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Number of faults',
          data: [],
          borderColor: '#66BB6A',
          
          backgroundColor: '#42A5F5'
        
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Number of faults per vehicle' }
        },
      },
   });



    this.chart3 = new Chart(this.chart3Ref.nativeElement.getContext('2d'),
    {
          type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Total revenue',
          data: [],
          
          backgroundColor: '#42A5F5'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          title: { display: true, text: 'Total revenue per vehicle type' }
        },
      },
    });

  }







  fillCharts()
  {
      this.rentalService.getRevenuePerDay(this.selectedMonth, this.selectedYear).subscribe(data => {
      const labels = data.map(d => new Date(d.date).toLocaleDateString('sr-RS'));
      const values = data.map(d => d.totalRevenue);

      this.chart1.data.labels = labels;
      this.chart1.data.datasets[0].data = values;
      this.chart1.update();
    });


     this.faultService.getFaultsGroupedByVehicle().subscribe(data => {
     const labels = data.map(d => d.vehicleModel);
     const values = data.map(d => d.faultCount);

     this.chart2.data.labels = labels;
     this.chart2.data.datasets[0].data = values;
     this.chart2.update();
    });




     this.rentalService.getRevenuePerVehicleType().subscribe(data => {
     const labels = data.map(d => d.vehicleType);
     const values = data.map(d => d.totalRevenue);

     this.chart3.data.labels = labels;
     this.chart3.data.datasets[0].data = values;
     this.chart3.update();
     });




  }





    

}
