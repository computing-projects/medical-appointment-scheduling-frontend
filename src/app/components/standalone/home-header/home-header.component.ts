import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'med-header',
  standalone: true,
  imports: [MatButtonModule, LoginModalComponent, SignupModalComponent],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeHeaderComponent {
  isLoggedIn = false;
  signupOpen = false;

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  openSignup() {
    this.isLoggedIn = false;
    this.signupOpen = true;
  }
}
