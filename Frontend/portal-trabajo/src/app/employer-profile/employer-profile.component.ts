import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-employer-profile',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss'
})
export class EmployerProfileComponent {
  offers = [
    {
      id: 1,
      role: 'Ayudante de Cocina',
      date: '11/7/25',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam.Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam.Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam.Perferendis! Lorem ipsum dolor sit amet consectetur adipisicing elit.Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam.Perferendis!',
    },
    {
      id: 2,
      role: 'Bachero',
      date: '11/7/2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam. Perferendis!'
    },
    {
      id: 3,
      role: 'Mesero',
      date: '11/7/2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam. Perferendis!'
    },
    {
      id: 4,
      role: 'Chef',
      date: '11/7/2',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi debitis, praesentium quae voluptates dolores culpa earum voluptas rem corrupti? Voluptate perspiciatis fugit accusamus, corporis maxime facilis quisquam earum nam. Perferendis!'
    },
  ]
}
