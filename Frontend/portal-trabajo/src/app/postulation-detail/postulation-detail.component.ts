import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { JobOffer } from '../../models/jobOffer.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EmployeeService } from '../services/employee.service';
import { PostulateDialogComponent } from '../postulate-dialog/postulate-dialog.component';

@Component({
  selector: 'app-postulation-detail',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './postulation-detail.component.html',
  styleUrl: './postulation-detail.component.scss'
})
export class PostulationDetailComponent implements OnInit {
  currentUserType: any;
  cv!: File;
  parseJwt(token: string | null): any {
    if (!token) return null;  
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.error("Error parsing JWT:", e);
      return null;
    }
  }
  itemId: string = "";
  offer = {} as JobOffer;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private employerservice: EmployerService,
    private employeeservice: EmployeeService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
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
    const token = localStorage.getItem('token');
    if (token) {
      const userData = this.parseJwt(token);

      if (userData && userData.tipo_usuario) {
        console.log('User type:', userData.tipo_usuario);

        // Use it directly
        if (userData.tipo_usuario === 'employer') {
          // Employer specific logic
        } else if (userData.tipo_usuario === 'candidate') {
          // Candidate specific logic
        }

        // Store it if needed elsewhere in the component
        this.currentUserType = userData.tipo_usuario;
      } else {
        console.warn('Token does not contain tipo_usuario');
      }
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
    dialogConfig.width = '400px'; // Set dialog width
    dialogConfig.data = {
      title: 'Confirmar postulación',
      content: 'Podes subir un CV personalizado u omitirlo ',
      trueAction: 'Postularme',
      action: (f:File) => this.receiveCv(f)
    }; // Pass data to the dialog

    const dialogRef = this.dialog.open(PostulateDialogComponent, dialogConfig);
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postulate(id, this.cv);
        console.log('Postulado a la oferta');
      }

      console.log('Dialog was closed with result:');
    });
  }

  navigateToLanding() {
    this.router.navigate(['']);
  }

  navigateToEditOffer(id: any) {
    if (this.compareDatesOffer(Date.parse(this.offer.fecha_cierre))) {
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

  postulate(id: any, cv: File) {
    this.employeeservice.postulateToOffer(id, cv).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.toastr.success('Ya estás postulado a la oferta', 'Postulación exitosa')
          console.log('Actualización exitosa', response);
        } else {
          console.log('No se pudo hacer la postulación', response);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al postular', err);

      }
    });

  }

  receiveCv(file: File) {
    this.cv = file
  }
}