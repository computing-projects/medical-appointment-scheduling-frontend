import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ClientPageRoutingModule } from '../../client-page/client-page-routing.module';
import { ClarityModule } from '@clr/angular';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Roles } from '../../models/user.model';

type ViewType = 'home' | 'agendamento' | 'perfil' | 'perfil-medico' | 'gerenciar-medicos';

@Component({
  selector: 'med-side-bar',
  standalone: true,
  imports: [ClientPageRoutingModule, ClarityModule, MatIcon, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  @HostBinding('class.med-side-bar') readonly hostClass = true;

  selectedView: ViewType = 'home';

  constructor(private authService: AuthenticationService) {}

  showView(view: ViewType): void {
    this.selectedView = view;
  }

  onNavigateToView(view: string): void {
    this.showView(view as ViewType);
  }

  getUserRole(): any {
    return this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
  }
}
