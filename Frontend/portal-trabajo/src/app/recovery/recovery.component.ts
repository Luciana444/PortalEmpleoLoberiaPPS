import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Validators, FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BigLogoComponent } from '../big-logo/big-logo.component';

@Component({
  standalone: true,
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule,BigLogoComponent],
})
export class RecoveryComponent implements OnInit {
  recovery : FormGroup;

  constructor(private router: Router, private recoveryService : UserService,private fb : FormBuilder,  private toastr: ToastrService){
    this.recovery = this.fb.group({
      email : ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    
  }


  submit(){
      if (this.recovery.invalid) {
    return;
  }

   
  const email = this.recovery.value.email;

    this.recoveryService.recoveryPassword({email}).subscribe({
      next : (res) => {
        if(res.status === 200){
         this.toastr.success('Verificá tu correo', 'Email enviado')
         console.log('Email enviado')
          setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
        }
      },
      error : (err : any) => {       
       this.toastr.error(err.error.error, 'Ocurrió un error');
       console.log('Error');
      }
    })
  }
}