import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDoctorCardComponent } from './scheduling-doctor-card.component';

describe('SchedulingDoctorCardComponent', () => {
  let component: SchedulingDoctorCardComponent;
  let fixture: ComponentFixture<SchedulingDoctorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDoctorCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingDoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
