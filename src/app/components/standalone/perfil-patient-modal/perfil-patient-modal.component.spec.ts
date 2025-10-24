import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPatientModalComponent } from './perfil-patient-modal.component';

describe('PerfilPatientModalComponent', () => {
  let component: PerfilPatientModalComponent;
  let fixture: ComponentFixture<PerfilPatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilPatientModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilPatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
