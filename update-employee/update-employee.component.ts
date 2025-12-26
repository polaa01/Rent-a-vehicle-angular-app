import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../model/User';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-update-employee',
  standalone: false,
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {

   @Output() cancel = new EventEmitter<void>();
   @Input() employee: User | null = null;
   @Output() save = new EventEmitter<User>();
 
    
    employeeUpdateForm!: FormGroup;
     constructor(private userService: UserService, private fb: FormBuilder)
      {
       this.employeeUpdateForm = this.fb.group({
         id: [null],
         firstName: [''],
         lastName: ['']
       });
      }
 
 
 
 
 ngOnChanges()
 {
   if(this.employee)
   {
     this.employeeUpdateForm.patchValue(this.employee);
   }
 }


  onSave()
  {

    if(this.employeeUpdateForm.valid)
      {
        this.save.emit(this.employeeUpdateForm.value);
      } 
   
  }

  onCancel()
  {  
    this.cancel.emit();
  }

}
