import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDoctorCalendarComponent } from './perfil-doctor-calendar.component';

describe('PerfilDoctorCalendarComponent', () => {
  let component: PerfilDoctorCalendarComponent;
  let fixture: ComponentFixture<PerfilDoctorCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilDoctorCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilDoctorCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
