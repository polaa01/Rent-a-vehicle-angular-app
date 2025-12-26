import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin-home',
  standalone: false,
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{
   currentUser: any;
   role!: string;
  
   ngOnInit(): void {

   this.role=sessionStorage.getItem('role') || '';
      
   }


   constructor(private authService: AuthService)
   {
      this.currentUser=authService.getLoggedInUser();
      //this.role=sessionStorage.getItem('role');
   }

   onLogout()
   {
    this.authService.logout();
   }

   openRss()
   {
      window.open('http://localhost:8080/rss', '_blank');
   }

   currentYear:number = new Date().getFullYear();

}
