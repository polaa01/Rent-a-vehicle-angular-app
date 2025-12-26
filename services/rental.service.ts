import { Injectable } from '@angular/core';
import { Rental } from '../model/Rental';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RevenuePerDay } from '../model/RevenuePerDay';
import { RevenuePervehicleType } from '../model/RevenuePerVehicleType';

@Injectable({
  providedIn: 'root'
})
export class RentalService {


  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getRentalsForVehicle(id: number) {
    return this.http.get<Rental[]>(`${this.apiUrl}/rentals/vehicle/${id}`);
  }

  getAllRentals(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiUrl}/rentals`);
  }

   getVehicleById(id: number):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiUrl}/vehicles/${id}`);
  }

   getClientById(id: number):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiUrl}/clients/${id}`);
  }


  getRevenuePerDay(month: number, year: number): Observable<RevenuePerDay[]>
  {
       const params = new HttpParams().set('month', month.toString()).set('year', year.toString());
       return this.http.get<RevenuePerDay[]>(`${this.apiUrl}/rentals/revenue-per-day`, {params});
  }

   getRevenuePerVehicleType(): Observable<RevenuePervehicleType[]>
  {
    return this.http.get<RevenuePervehicleType[]>(`${this.apiUrl}/rentals/revenue-per-vehicle-type`);
  }


}
