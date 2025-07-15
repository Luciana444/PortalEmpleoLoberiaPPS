import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { EmployerProfileSidebarComponent } from "../employer-profile-sidebar/employer-profile-sidebar.component";
import { Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';


@Component({
  selector: 'app-employer-profile',
  imports: [HeaderComponent, FooterComponent, EmployerProfileSidebarComponent],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss'
})
export class EmployerProfileComponent implements OnInit {
  [x: string]: any;
  itemId: string = "";
  offers: ActiveOffer[] = [];
  constructor(
    private router: Router,
    private employerService: EmployerService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.employerService.getACtiveOffers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          response.body?.forEach(element => {
            const offer: ActiveOffer = {
              id: element.id,
              puesto_requerido: element.puesto_requerido,
              descripcion: element.descripcion,
              fecha_publicacion: element.fecha_publicacion
            };
            this.offers.push(offer);
          });
        } else {
          console.log('No se pudo cargar oferta', response);
        }
      },
      error: (err) => {
        // this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al cargar oferta', err);
      }

    });

  }

  navigateToCreateOffer() {
    this.router.navigate(['/create-offer'])
  }

  navigateToPostulationDetail(id: any) {
    this.router.navigate(['/detail', id])
  }
}


interface ActiveOffer {
  id: string;
  puesto_requerido: string;
  descripcion: string;
  fecha_publicacion: string;
}