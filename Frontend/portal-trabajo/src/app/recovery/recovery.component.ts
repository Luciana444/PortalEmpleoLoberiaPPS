import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss',
  imports: [ReactiveFormsModule],
})
export class RecoveryComponent implements OnInit {
  recovery : FormGroup;

  constructor(private router: Router, private recoveryService : UserService,private fb : FormBuilder){
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
         //this.toastr.success('Email enviado, Verificá tu correo', 'Success')
         console.log('Email enviado')
          setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
        }
      },
      error : (err : any) => {
       // this.toastr.error('Email no enviado', 'Error');
       console.log('Error');
       
       
      }
    })
  }
}