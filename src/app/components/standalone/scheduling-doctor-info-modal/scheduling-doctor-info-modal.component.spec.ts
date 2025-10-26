import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDoctorInfoModalComponent } from './scheduling-doctor-info-modal.component';

describe('SchedulingDoctorInfoModalComponent', () => {
  let component: SchedulingDoctorInfoModalComponent;
  let fixture: ComponentFixture<SchedulingDoctorInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDoctorInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingDoctorInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
