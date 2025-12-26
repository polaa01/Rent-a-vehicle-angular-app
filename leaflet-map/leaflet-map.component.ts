import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Vehicle } from '../model/Vehicle';
import { VehicleService } from '../services/vehicle.service';
//import * as L from 'leaflet';
@Component({
  selector: 'app-leaflet-map',
  standalone: false,
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css'
})
export class LeafletMapComponent implements OnInit{

  /*
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([44.7722, 17.1910]) // Dhaka, Bangladesh
  ];
  
  //platformId = Inject(PLATFORM_ID);
   //showLeaflet = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    //if (isPlatformBrowser(this.platformId)) {
      //this.showLeaflet  = true;
    //}
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.centerMap();
    }
    
  }


  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map into the boundary
    this.map.fitBounds(bounds);
  }
    */

  /*
  private map!: L.Map;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  private centroid: L.LatLngExpression = [44.2, 17.8]; //
   ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        
        import('leaflet').then((L) => {
          this.initMap(L);
        });
      }

    }
  

  private initMap(L: any): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 6,
      zoomControl: true,
      maxBounds: [
        [42.546245, 15.728733],
        [45.276871, 19.623444]
      ],
      maxBoundsViscosity: 1.0,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      dragging: true
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  
    // 💡 VAŽNO!
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

*/
constructor(private vehicleService: VehicleService){}
grid: number[] = [];
vehicles: Vehicle[]=[];
baseUrl = 'http://localhost:8080';
rows = 30;
cols = 50;

ngOnInit(): void {
  //this.grid = Array(this.rows * this.cols).fill(0);
  this.loadVehicles();
}
/*
isVehicleHere(index: number): boolean {
  return this.vehicles.includes(index);
}
*/
loadVehicles(): void {
  this.vehicleService.getAllVehicles().subscribe(data => {
    this.vehicles = data;
  });
}

isVehicleAt(x: number, y: number): Vehicle | undefined {
  return this.vehicles.find(v => v.positionX === x && v.positionY === y);
}

getGridArray(): number[] {
  return Array(this.rows * this.cols).fill(0);
}

getCoordinates(index: number): { x: number, y: number } {
  return {
    x: index % this.cols,
    y: Math.floor(index / this.cols)
  };
}

showVehicleInfo(vehicle: Vehicle): void {
  alert(`Vehicle: ${vehicle.model}\nVehicle id: ${vehicle.vehicleId}\nPosition: (${vehicle.positionX}, ${vehicle.positionY})`);
}
/*
getIconForVehicle(vehicle: Vehicle): string {
  switch (vehicle.type) {
    case 'car': return 'assets/car.jpg';
    case 'bike': return 'assets/bike.jpg';
    case 'scooter': return 'assets/scooter.jpg';
    default: return '';
  }
}
*/



}
