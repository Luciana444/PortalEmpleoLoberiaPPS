import { Component } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-attatch-cv',
  imports: [],
  templateUrl: './attatch-cv.component.html',
  styleUrl: './attatch-cv.component.scss'
})
export class AttatchCvComponent {
  constructor(private userservice: UserService) {
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
}
