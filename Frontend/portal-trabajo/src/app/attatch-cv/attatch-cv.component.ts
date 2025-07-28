import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { CvUploaderComponent } from '../cv-uploader/cv-uploader.component';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-attatch-cv',
  imports: [CvUploaderComponent, MatTooltipModule],
  templateUrl: './attatch-cv.component.html',
  styleUrl: './attatch-cv.component.scss'
})
export class AttatchCvComponent {
  constructor(
    private http: HttpClient,
    private userservice: UserService,
    private toastr: ToastrService,
    private authService: AuthService,) {
  }
  @Input()
  cvUrl: string = '';

  downloadCv() {
    const url = '/ciudadano/generar_cv';
    this.userservice.downloadGeneratedCv(url).subscribe({
      next(response) {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(response.body ?? new Blob());
        a.href = objectUrl;
        a.download = 'cv.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error(err) {
        console.error(err);
      }

    });
  }

  receiveCv(file: File) {
    this.userservice.uploadCv(file).subscribe({
      next: (response) => {
        if (response.status === 200) {

          this.toastr.success('Tu Cv ya está disponible', 'Archivo subido')
          console.log('Archivo subido con éxito', response);

        } else {
          console.log('No se pudo subir el archivo', response);
        }
      },
      error: (err) => {

        this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al intentar subir un archivo', err);

      }
    });
  }

  getUserType(): string | null {
    return this.authService.getCurrentUserType();
  }

  // getCV() {
  //   // userName: string
  //   console.log("getCV called");
  //   console.log(this.cvUrl);
  //   this.http.get(this.cvUrl, { responseType: 'blob' }).subscribe({
  //     next: (blob) => {
  //       const pdfBlob = new Blob([blob], { type: 'application/pdf' });
  //       const fileURL = URL.createObjectURL(pdfBlob);

  //       // Open PDF in a new tab
  //       window.open(fileURL, '_blank');

  //       // Optionally, download the file with the user's name
  //       const a = document.createElement('a');
  //       a.href = fileURL;
  //       // a.download = `${userName}.pdf`;
  //       a.download = `cv.pdf`;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);

  //       setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
  //     },
  //     error: (err) => {
  //       this.toastr.error('No se pudo descargar el CV', 'Error');
  //       console.error('Error downloading CV:', err);
  //     }
  //   });
  // }
}
