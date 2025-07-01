import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  goToLoberia(){
    window.open('https://www.loberia.gov.ar/', '_blank');
  }
}
