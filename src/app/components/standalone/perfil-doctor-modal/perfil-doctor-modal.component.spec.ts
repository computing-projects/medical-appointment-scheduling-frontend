import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDoctorModalComponent } from './perfil-doctor-modal.component';

describe('PerfilDoctorModalComponent', () => {
  let component: PerfilDoctorModalComponent;
  let fixture: ComponentFixture<PerfilDoctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilDoctorModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilDoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
