import { Component, ViewEncapsulation } from '@angular/core';
import { HomeHeaderComponent } from '../standalone/home-header/home-header.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [HomeHeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

}
