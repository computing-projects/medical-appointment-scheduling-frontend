import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDoctorRegisterComponent } from './manager-doctor-register.component';

describe('ManagerDoctorRegisterComponent', () => {
  let component: ManagerDoctorRegisterComponent;
  let fixture: ComponentFixture<ManagerDoctorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDoctorRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerDoctorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
