import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientPageComponent } from './components/client-page.component';
import { ClientPageRoutingModule } from './client-page-routing.module';
import { SideBarComponent } from '../standalone/side-bar/side-bar.component';

@NgModule({
  declarations: [ClientPageComponent],
  imports: [ClientPageRoutingModule, SideBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ClientPageModule {}
