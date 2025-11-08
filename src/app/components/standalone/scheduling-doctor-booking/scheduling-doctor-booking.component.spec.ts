import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDoctorBookingComponent } from './scheduling-doctor-booking.component';

describe('SchedulingDoctorBookingComponent', () => {
  let component: SchedulingDoctorBookingComponent;
  let fixture: ComponentFixture<SchedulingDoctorBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDoctorBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingDoctorBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
