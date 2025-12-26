import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }



  getClients(): Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiUrl}/clients`);
  }



  blockClient(id: number) {
    return this.http.put(`${this.apiUrl}/clients/block/${id}`, {});
  }



  unblockClient(id: number) {
    return this.http.put(`${this.apiUrl}/clients/unblock/${id}`, {});
  }



  getEmployees(): Observable<any[]>
 {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
 }

 getEmployeesDTO(): Observable<any[]>
 {
    return this.http.get<any[]>(`${this.apiUrl}/employees/get`);
 }



  createEmployee(employee: any):Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employee);
  }



  updateEmployee(employee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/update/${employee.id}`, employee);
  }



  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiUrl}/employees/delete/${id}`);
  }

}
