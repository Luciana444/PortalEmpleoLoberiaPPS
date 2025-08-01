import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  imports: [MatTooltipModule, MatExpansionModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent implements OnInit {

  readonly panelOpenState = signal(false);
  totalOffers: any;
  totalUsers: any;
  totalPostulations: any;

  constructor(
    private reportservice: ReportsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.getTotalNumberOffers();
    this.getNumberUsers();
    this.getTotalNumberPostulations();
  }

  getTotalNumberOffers() {
    this.reportservice.getTotalOffers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.totalOffers = response.body.count;
        } else {
          console.log('El usuario no se pudo registrar', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al registrar usuario', err);

      }
    });
  }

  getTotalNumberPostulations() {
    this.reportservice.getTotalPostulations().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.totalPostulations = response.body.count;
        } else {
          console.log('No se pueden mostrar los datos', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('No se pueden mostrar los datos de reporte', err);

      }
    });
  }

  getNumberUsers() {
    this.reportservice.getTotalUsers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.totalUsers = response.body;
        } else {
          console.log('No se pueden obtener los datos', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al mostrar los datos', err);

      }
    });
  }
}



