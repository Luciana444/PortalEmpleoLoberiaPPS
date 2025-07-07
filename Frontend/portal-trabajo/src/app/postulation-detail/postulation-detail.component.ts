import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-postulation-detail',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './postulation-detail.component.html',
  styleUrl: './postulation-detail.component.scss'
})
export class PostulationDetailComponent {

}
