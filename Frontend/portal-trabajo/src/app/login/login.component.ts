import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private router: Router, private fb:FormBuilder, private userservice:UserService) {
    this.loginForm = this.fb.group({
      email: [null,Validators.required],
      contrasena: [null,Validators.compose([Validators.required,Validators.minLength(5)])]
    });
  }
  
  ngOnInit() {
  }


  login() {
    this.userservice.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        (response: any) => {      
        if (response.resultado && response.resultado.token) {
            localStorage.setItem('token',response.resultado.token);
            let payload=this.loginForm.value.email;
            localStorage.setItem('currentuser',payload);
            this.loginForm.reset();
            
            setTimeout(() => {
              this.router.navigate(['landing']);
            }, 2000);
          }
          else {
            console.log('Usuario/contrasena invalido');
          }
        },
        (error) => { console.log(error); }
      );
  }

  goToEmployeeForm(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/employee-form']);
  }
}
