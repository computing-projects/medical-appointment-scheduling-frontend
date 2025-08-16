import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'med-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  @HostBinding ('class.med-footer') isActive = true;
}
