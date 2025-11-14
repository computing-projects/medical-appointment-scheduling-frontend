import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminPageComponent } from './components/admin-page.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { SideBarComponent } from '../standalone/side-bar/side-bar.component';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [AdminPageRoutingModule, SideBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AdminPageModule {}

