import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'med-global-header',
  standalone: true,
  imports: [],
  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class GlobalHeaderComponent {
  @HostBinding('class.med-global-header') readonly hostClass = true;

  constructor(private authService: AuthenticationService) {}

  displayUserName(): string | undefined {
    if (this.authService.getUser()?.name !== undefined)
      return this.authService.getUser()?.name
    else return '';
  }

}
