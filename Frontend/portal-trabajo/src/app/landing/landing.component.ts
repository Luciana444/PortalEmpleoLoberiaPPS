import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
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
    let usuarios = this.http.get('http://localhost:3000/api/usuario')
      .subscribe(
        (response:any)=>{
          console.log(response);
      }
      );
  }

  ngOnInit(){
      this.getData();
  }

}
