import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDoctorWaitlistModalComponent } from './scheduling-doctor-waitlist-modal.component';

describe('SchedulingDoctorWaitlistModalComponent', () => {
  let component: SchedulingDoctorWaitlistModalComponent;
  let fixture: ComponentFixture<SchedulingDoctorWaitlistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDoctorWaitlistModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingDoctorWaitlistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
