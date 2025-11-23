import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDoctorSearchListComponent } from './scheduling-doctor-search-list.component';

describe('SchedulingDoctorSearchListComponent', () => {
  let component: SchedulingDoctorSearchListComponent;
  let fixture: ComponentFixture<SchedulingDoctorSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingDoctorSearchListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingDoctorSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
