import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  standalone: false,
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {

  roles=['ADMIN', 'OPERATOR', 'MANAGER'];
  @Output() cancel = new EventEmitter<void>();

  //employee=['firstName', 'lastName', 'username', 'password', 'role'];
  /*
  employee = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: ''
  };
  */

  createEmployeeForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder)
  {
    this.createEmployeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      password: [''],
      role: ['', Validators.required]
    });
  }

  closeForm()
  {
    this.cancel.emit();
  }

  onSave()
  {

    if (this.createEmployeeForm.valid) {
      const formData = this.createEmployeeForm.value;
  
      let employeeData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        role: formData.role
      
      };

        this.userService.createEmployee(employeeData).subscribe(() => {
          this.closeForm();
        });

  }

}
    

}
