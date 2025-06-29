import { Component, OnInit  } from '@angular/core';
import { UserService} from '../services/user.service';
import { ReactiveFormsModule , FormGroup, Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-form',
   imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  registerForm: FormGroup

  constructor(private router: Router, private fb:FormBuilder, private userservice:UserService) {
    this.registerForm = this.fb.group({
      nombre:[null,Validators.required],
      //surname:[null,Validators.required],
      tipo_usuario:[null,Validators.required],
      email: [null,Validators.compose([Validators.required, Validators.email])],
      contrasena: [null,Validators.compose([Validators.required,Validators.minLength(8)])]
    });
  }
  ngOnInit() {
  }
  
  registerUser(){
    if (this.registerForm.invalid) {
    return;
  }


  this.userservice.registerNewUser(JSON.stringify(this.registerForm.value)).subscribe({
    next: (response) => {
      if(response.status === 201){
        console.log('Registro exitoso', response);
        this.registerForm.reset();
        this.router.navigate(['login']); 
      } else{
        console.log('El usuario no se pudo registrar', response);
      }
    },    
    error: (err) => {
      console.error('Error al registrar usuario', err);
   
    }
  });
}


}

 
