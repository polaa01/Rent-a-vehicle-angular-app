import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manufacturer } from '../model/Manufacturer';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
 

  private apiUrl = 'http://localhost:8080/api/manufacturers';

  constructor(private http: HttpClient) { }

  getManufacturers(): Observable<any[]>
  {
    
    return this.http.get<any[]>(`${this.apiUrl}`);
    /*.pipe(
      map(manufacturers => manufacturers.map(m => new Manufacturer(m.id, m.name, m.country, m.phone, m.address, m.fax, m.email))) // Filtriraj podatke ovde
    );
    */
  }

  deleteManufacturer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


createManufacturer(manufacturer: any): Observable<any>
{
   return this.http.post(this.apiUrl, manufacturer);
}

updateManufacturer(manufacturer: any): Observable<any>
{
  return this.http.put(`${this.apiUrl}/update/${manufacturer.id}`, manufacturer);
}





}
