import { Injectable } from '@angular/core';
import { Fault } from '../model/Fault';
import { HttpClient } from '@angular/common/http';
import { FaultsPerVehicle } from '../model/FaultsPerVehicle';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FaultService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/faults'; 

  getFaultsForVehicle(id: number) {
    return this.http.get<Fault[]>(`${this.apiUrl}/vehicle/${id}`);
  }
  

  addFaultToVehicle(vehicleId: number, description: string, date: Date) {
     const faultRequest = {
    vehicleId: vehicleId,
    description: description,
    dateReported: date.toISOString()
  };
  return this.http.post<Fault>(`${this.apiUrl}/add`, faultRequest);
    //return this.http.post<Fault>(`${this.apiUrl}/add`, { id, description, date:date.toISOString() });
  }
  
  deleteFault(faultId: number) {
    return this.http.delete(`${this.apiUrl}/delete/${faultId}`);
  }

  
  getFaultsGroupedByVehicle():Observable<FaultsPerVehicle[]>
  {
    return this.http.get<FaultsPerVehicle[]>(`${this.apiUrl}/faults-grouped-by-vehicle`);
  }


}
