import { Component } from '@angular/core';

@Component({
  selector: 'app-training-link',
  imports: [],
  templateUrl: './training-link.component.html',
  styleUrl: './training-link.component.scss'
})
export class TrainingLinkComponent {
  goToFomentarEmpleo(){
    window.open('https://www.argentina.gob.ar/trabajo/fomentarempleo', '_blank');
  }
}
