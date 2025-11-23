import { Component, ViewEncapsulation } from '@angular/core';
import { HomeHeaderComponent } from '../standalone/home-header/home-header.component';
import { HomeHeroComponent } from '../standalone/home-hero/home-hero.component';
import { HomeBenefitsComponent } from '../standalone/home-benefits/home-benefits.component';
import { FooterComponent } from '../standalone/footer/footer.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [HomeHeaderComponent, HomeHeroComponent, HomeBenefitsComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

}
