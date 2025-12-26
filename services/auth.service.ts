import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>
  {
      //return this.http.post(`${this.apiUrl}/login`, {username, password});

      return this.http.post(`${this.apiUrl}/login`, {username, password}).pipe(tap((response: any) =>
      {
         console.log('Login response:', response);
         this.setLoggedInUser(response.employee);
         sessionStorage.setItem('role', response.role);
      })
    );
  }

  logout()
  {
    //sessionStorage.removeItem('loggedInUser');
    sessionStorage.clear();
    //this.router.navigate
  }

  isLoggedIn()
  {
    return sessionStorage.getItem('loggedInUser')!== null;
  }


  setLoggedInUser(user: any)
  {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser()
  {
    //const user= sessionStorage.getItem('loggedInUser');
    //return user ? JSON.parse(user):null;
    if(typeof window !== 'undefined')
    {
      return sessionStorage.getItem('loggedInUser');
    }
    return null;
  }

  getUserRole(): string | null
  {
   return sessionStorage.getItem('role');
  }


hasRole(role: string): boolean
{
  const userRole = this.getUserRole();
  return userRole === role;
}


}
