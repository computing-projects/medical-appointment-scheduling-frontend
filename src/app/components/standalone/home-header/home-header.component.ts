import { Component, ViewEncapsulation } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'ac-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeHeaderComponent {
  isLoggedIn = false; // Simulação de login

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
