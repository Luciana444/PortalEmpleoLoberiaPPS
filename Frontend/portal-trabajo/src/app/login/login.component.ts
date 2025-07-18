import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BigLogoComponent } from '../big-logo/big-logo.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, BigLogoComponent, MatFormFieldModule,
    MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private router: Router, private fb: FormBuilder, private userservice: UserService, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      contrasena: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) return;

    this.userservice.login(JSON.stringify(this.loginForm.value)).subscribe({
      next: (response: any) => {
        if (response.resultado && response.resultado.token) {
          localStorage.setItem('token', response.resultado.token);
          localStorage.setItem('currentuser', this.loginForm.value.email);
          this.loginForm.reset();
          this.toastr.success('Inicio de sesión exitoso', '¡Bienvenido!');
          setTimeout(() => {
            this.router.navigate(['landing']);
          }, 2000);
        }
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.toastr.warning('Usuario o contraseña inválido', 'Atención');
        } else {
          console.log(err);
          this.toastr.error(err.error?.error, 'Ocurrió un error');
        }
      }
    });
  }


  goToEmployeeForm(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/register-user']);
  }
}
