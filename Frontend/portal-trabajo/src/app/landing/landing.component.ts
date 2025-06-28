import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
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
