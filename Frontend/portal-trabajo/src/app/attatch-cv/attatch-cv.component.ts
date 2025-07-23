import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CvUploaderComponent } from '../cv-uploader/cv-uploader.component';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-attatch-cv',
  imports: [CvUploaderComponent, MatTooltipModule],
  templateUrl: './attatch-cv.component.html',
  styleUrl: './attatch-cv.component.scss'
})
export class AttatchCvComponent {
  constructor(private userservice: UserService, private toastr: ToastrService) {
  }
  hasCV = false;

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
}
