import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

type ViewType = 'home' | 'perfil-medico';

@Component({
  selector: 'med-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorPageComponent {
  @HostBinding('class.med-doctor-page') readonly hostClass = true;

  selectedView: ViewType = 'home';

  showView(view: ViewType): void {
    this.selectedView = view;
  }

  onNavigateToView(view: string): void {
    this.showView(view as ViewType);
  }
}

