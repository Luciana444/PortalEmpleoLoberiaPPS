import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { title } from 'node:process';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private router: Router, private http: HttpClient) {}
  
  offers = [
    { id: 1,
      user: "Restaurante Lobería", 
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img:""
    }, 
    { id: 2,
      user: "Restaurante Lobería", 
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img:""
    }
  ];

  public getJson: any;

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToFormSelector() {
    this.router.navigate(['/form-selector']);
  }

  public getData() {
    let usuarios = this.http.get('http://localhost:3000/api/usuario')
      .subscribe(
        (response:any)=>{
          console.log(response);
      }
      );
  }

  ngOnInit(){
      this.getData();
  }

}
