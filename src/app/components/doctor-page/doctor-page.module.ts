import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DoctorPageComponent } from './components/doctor-page.component';
import { DoctorPageRoutingModule } from './doctor-page-routing.module';
import { SideBarComponent } from '../standalone/side-bar/side-bar.component';

@NgModule({
  declarations: [DoctorPageComponent],
  imports: [DoctorPageRoutingModule, SideBarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DoctorPageModule {}

