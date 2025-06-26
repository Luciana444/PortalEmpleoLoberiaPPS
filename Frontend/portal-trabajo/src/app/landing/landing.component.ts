import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(private router: Router, private http: HttpClient) {}
  
  public getJson: any;

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToFormSelector() {
    this.router.navigate(['/form-selector']);
  }

  public getData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(
      //   (data) => {
      //   this.getJson = data;
      //   console.log(this.getJson);
      // }, (error) => {
      //   console.error('Error fetching data:', error);
      // }
    );
  }
}
