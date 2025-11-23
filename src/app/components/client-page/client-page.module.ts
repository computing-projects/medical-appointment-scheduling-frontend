import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientPageComponent } from './components/client-page.component';
import { ClientPageRoutingModule } from './client-page-routing.module';
import { SideBarComponent } from '../standalone/side-bar/side-bar.component';
import { GlobalHeaderComponent } from "../standalone/global-header/global-header.component";
import { FooterComponent } from "../standalone/footer/footer.component";

@NgModule({
  declarations: [ClientPageComponent],
  imports: [ClientPageRoutingModule, SideBarComponent, GlobalHeaderComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ClientPageModule {}
