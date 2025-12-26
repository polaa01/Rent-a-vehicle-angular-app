import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string='';

form: FormGroup;

constructor(private fb: FormBuilder, private router: Router, private authService: AuthService)
{
  this.form = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
  });

}



onLogin()
{
if (this.form.valid) {
  const { username, password } = this.form.value;

  this.authService.login(username, password).subscribe({
    next: (user) => {
      
      this.router.navigate(['/admin']);
    },
    error: () => {
      this.errorMessage = 'Invalid username or password!';

      setTimeout(()=>{
  this.errorMessage='';
      }, 2000);
    }
  });
}

}
/*
{
  if(this.form.valid)
  {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.router.navigate(['/admin']);
  }

}
*/

  onReset()
  {
    this.form.reset();  
  }

  
  
}
