import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'med-home-hero',
  standalone: true,
  imports: [],
  templateUrl: './home-hero.component.html',
  styleUrl: './home-hero.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeHeroComponent {

  @HostBinding('class.med-home-hero') isActive = true;

}
