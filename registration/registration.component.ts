import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  form: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router)
  {
    this.form = this.fb.group({
        name:['', Validators.required],
        surname:['', Validators.required],
        selectedRole:['', Validators.required],
        username:['', Validators.required],
        password:['', Validators.required]
    });
  
  }


  goBack()
  {
    this.router.navigate(['']);
  }

  onReset()
  {
    this.form.reset();  
  }

}
