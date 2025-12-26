import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../model/Vehicle';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiBaseUrl = 'http://localhost:8080/api';
  

  constructor(private http: HttpClient) { }

  getCars(): Observable<any[]>
  {
      return this.http.get<any[]>(`${this.apiBaseUrl}/cars`);
  }



  getBikes(): Observable<any[]>
  {
      return this.http.get<any[]>(`${this.apiBaseUrl}/bikes`);
  }

  getScooters(): Observable<any[]>
  {
      return this.http.get<any[]>(`${this.apiBaseUrl}/scooters`);
  }

  

  createCar(car: any): Observable<any>
  {
     return this.http.post(`${this.apiBaseUrl}/cars`, car);
  }

  createBike(bike: any): Observable<any>
  {
     return this.http.post(`${this.apiBaseUrl}/bikes`, bike);
  }

  createScooter(scooter: any): Observable<any>
  {
     return this.http.post(`${this.apiBaseUrl}/scooters`, scooter);
  }



  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/vehicles/delete/${id}`);
  }



  uploadCsv(type: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/vehicles/${type}/upload`, formData);
  }

  getVehicleById(id: number):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiBaseUrl}/vehicles/${id}`);
  }

  getAllVehicles(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiBaseUrl}/vehicles`);
  }


  updateRentPrice(id: number, newPrice: number): Observable<any> {
  return this.http.put(`${this.apiBaseUrl}/vehicles/${id}/rent-price`, newPrice);
}






}
