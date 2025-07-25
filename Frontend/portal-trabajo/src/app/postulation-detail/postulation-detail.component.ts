import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { JobOffer } from '../../models/jobOffer.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EmployeeService } from '../services/employee.service';
import { PostulateDialogComponent } from '../postulate-dialog/postulate-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-postulation-detail',
  imports: [HeaderComponent, FooterComponent, MatTooltipModule],
  templateUrl: './postulation-detail.component.html',
  styleUrl: './postulation-detail.component.scss'
})

export class PostulationDetailComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private employerservice: EmployerService,
    private employeeservice: EmployeeService,
    public dialog: MatDialog
  ) { }

  currentUserType: any;
  currentUserId: any;
  cv!: File;
  msg: string = "";
  itemId: string = "";
  offer = {} as JobOffer;
  postulado: boolean = false;

  ngOnInit(): void {

    let isPostulado = this.route.snapshot.params['postulado'] ?? null; // Get Postulado from route   
    this.postulado = !!isPostulado;

    this.getCurrentOffer();
    // this.OfferService.getCurrentOffer()
    this.currentUserType = this.authService.getCurrentUserType();
    this.currentUserId = this.authService.getCurrentUserId();
  }

  private getCurrentOffer() {
    this.itemId = this.route.snapshot.params['id'] ?? ""; // Get ID from route
    if (this.itemId) {
      this.employerservice.getOfferById(this.itemId).subscribe({
        next: (response) => {
          if (response.status === 200) { // Populate form with API data
            this.offer = response.body[0] as JobOffer;
          } else {
            console.log('No se pudo cargar oferta', response);
          }
        },
        error: (err) => {
          //this.toastr.error(err.error.error, 'Ocurrió un error');
          console.error('Error al cargar oferta', err);
        }
      });
    }
  }

  deleteOffer(id: any) {
    this.employerservice.deleteOfferById(id).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastr.success('Actualización exitosa', 'Oferta borrada')
          console.log('Actualización exitosa', response);

          this.router.navigate(['employer-profile']);
        } else {
          console.log('No se pudo borrar la oferta', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al borrar oferta', err);

      }
    });

  }

  openDialog(id: any): void {
    const dialogConfig = new MatDialogConfig();

    // Configure dialog options (optional)
    dialogConfig.disableClose = true; // Prevent closing by clicking outside
    dialogConfig.autoFocus = true; // Automatically focus the first tabbable element
    dialogConfig.width = '400px'; // Set dialog width
    dialogConfig.data = {
      title: 'Borrar oferta',
      content: 'Desea borrar la oferta?',
      trueAction: 'Sí, quiero borrarla'
    }; // Pass data to the dialog

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOffer(id);
        console.log('Borrar oferta');
      }

      console.log('Dialog was closed with result:', result);
    });
  }

  openDialogPostulation(id: any): void {
    const dialogConfig = new MatDialogConfig();

    // Configure dialog options (optional)
    dialogConfig.disableClose = true; // Prevent closing by clicking outside
    dialogConfig.autoFocus = true; // Automatically focus the first tabbable element
    dialogConfig.width = '600px'; // Set dialog width
    dialogConfig.data = {
      title: `Postularse a ${this.offer.puesto_requerido}`,
      content: 'Antes de confirmar la postulación podes agregar un CV personalizado y un mensaje al empleador(ambos son opcionales)',
      trueAction: 'POSTULARME',
      action: (f: File, msg: string) => this.receiveData(f, msg)
    }; // Pass data to the dialog

    const dialogRef = this.dialog.open(PostulateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postulate(id, this.cv, this.msg);
        console.log('Postulado a la oferta');
      }

      console.log('Dialog was closed with result:');
    });
  }

  openDialogDeletePostulation(id: any): void {
    const dialogConfig = new MatDialogConfig();

    // Configure dialog options (optional)
    dialogConfig.disableClose = true; // Prevent closing by clicking outside
    dialogConfig.autoFocus = true; // Automatically focus the first tabbable element
    dialogConfig.width = '400px'; // Set dialog width
    dialogConfig.data = {
      title: 'Cancelar postulación',
      content: 'Desea cancelar la postulación?',
      trueAction: 'Sí, quiero cancelarla'
    }; // Pass data to the dialog

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePostulation(id);
        console.log('Borrada postulación');
      }

      console.log('Dialog was closed with result:', result);
    });
  }

  deletePostulation(id: any) {
    this.employeeservice.deletePostulationByOfferId(id).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastr.success('Actualización exitosa', 'Postulación borrada')
          console.log('Actualización exitosa', response);
          this.postulado = false;
        } else {
          console.log('No se pudo borrar la postulación', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al borrar oferta', err);

      }
    });

  }

  navigateToLanding() {
    this.router.navigate(['']);
  }

  navigateToViewPostulations(id: string) {
    this.router.navigate(['postulaciones-por-oferta', id])
  }

  navigateToProfile() {
    this.router.navigate(['profile'])
  }

  navigateToEditOffer(id: any) {
    if (!this.offer.fecha_cierre || this.compareDatesOffer(Date.parse(this.offer.fecha_cierre))) {
      this.router.navigate(['create-offer', id]);
    } else {
      this.toastr.warning('Oferta cerrada', 'No es posible editar la oferta cerrada')
      console.log('La oferta ya cerró y no se puede editar');
    }
  }

  compareDatesOffer(dateOffer: number): boolean {
    const today = Date.now();
    return today < dateOffer;
  }

  postulate(id: any, cv: File, msg: string) {
    this.employeeservice.postulateToOffer(id, cv, msg).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastr.success('Ya estás postulado a la oferta', 'Postulación exitosa')
          console.log('Actualización exitosa', response);
          this.postulado = true;
        } else {
          console.log('No se pudo hacer la postulación', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al postular', err);
        this.postulado = false;
      }
    });

  }

  receiveData(file: File, msg: string) {
    this.cv = file;
    this.msg = msg;
  }
}