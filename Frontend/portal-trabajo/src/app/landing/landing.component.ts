import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../services/paginator.service';
import { TrainingLinkComponent } from '../training-link/training-link.component';

@Component({
  selector: 'app-landing',
  imports: [MatPaginator, HeaderComponent, FooterComponent, TrainingLinkComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }]
})
export class LandingComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  offers = [
    {
      id: 1,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 2,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 3,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 4,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 5,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 6,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 7,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 8,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 9,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 10,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    },
    {
      id: 11,
      user: "Restaurante Lobería",
      location: "Lobería",
      title: "Ayudante de Cocina",
      description: "Renombrada Parrilla incorpora ayudante con experiencia. Se busca una persona proactiva, dinámica, con ganas de formar parte de un equipo de trabajo estable. PRINCIPALES        TAREAS: Realizar la mise en place. Preparar, cocinar y     despachar los pedidos. Preparar y cocinar la comida del personal.....",
      modality: "Presencial",
      date: "01/10/2023",
      img: ""
    }
  ];

  currentPage = 0;
  pageSize = 10;

  public getData() {
    let usuarios = this.http.get('http://localhost:3000/api/usuario')
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );
  }

  ngOnInit() {
    this.getData();
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get pagedOffers() {
    const start = this.currentPage * this.pageSize;
    return this.offers.slice(start, start + this.pageSize);
  }

}