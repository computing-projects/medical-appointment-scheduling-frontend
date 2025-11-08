import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAppointmentComponent } from './perfil-appointment.component';

describe('PerfilAppointmentComponent', () => {
  let component: PerfilAppointmentComponent;
  let fixture: ComponentFixture<PerfilAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
