import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'med-home-benefits',
  standalone: true,
  imports: [],
  templateUrl: './home-benefits.component.html',
  styleUrl: './home-benefits.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeBenefitsComponent {
  @HostBinding('class.med-home-benefits') isActive = true;
}
