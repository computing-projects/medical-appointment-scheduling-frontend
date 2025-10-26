import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDoctorAppointmentModalComponent } from './scheduling-doctor-appointment-modal.component';

describe('SchedulingDoctorAppointmentModalComponent', () => {
  let component: SchedulingDoctorAppointmentModalComponent;
  let fixture: ComponentFixture<SchedulingDoctorAppointmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDoctorAppointmentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingDoctorAppointmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
