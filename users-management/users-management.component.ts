import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-users-management',
  standalone: false,
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.css'
})
export class UsersManagementComponent implements OnInit{

  userRole: string |null ='';
  constructor(private auth: AuthService)
  {

  }

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();
  }

}
