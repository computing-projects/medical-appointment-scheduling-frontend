import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'med-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  @HostBinding('class.med-admin-page') readonly hostClass = true;
}

