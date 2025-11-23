import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAnamneseComponent } from './perfil-anamnese.component';

describe('PerfilAnamneseComponent', () => {
  let component: PerfilAnamneseComponent;
  let fixture: ComponentFixture<PerfilAnamneseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilAnamneseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilAnamneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
