import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDoctorEditComponent } from './manager-doctor-edit.component';

describe('ManagerDoctorEditComponent', () => {
  let component: ManagerDoctorEditComponent;
  let fixture: ComponentFixture<ManagerDoctorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDoctorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDoctorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
