import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDashboardComponent } from './home-dashboard.component';

describe('HomeDashboardComponent', () => {
  let component: HomeDashboardComponent;
  let fixture: ComponentFixture<HomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default user data', () => {
    expect(component.userName).toBe('Fulano');
    expect(component.upcomingAppointments).toBe(2);
    expect(component.totalConsultations).toBe(15);
    expect(component.pendingTasks).toBe(1);
    expect(component.hasUpcomingAppointment).toBe(true);
  });

  it('should emit navigateToView event when navigateTo is called', () => {
    spyOn(component.navigateToView, 'emit');
    
    component.navigateTo('agendamento');
    
    expect(component.navigateToView.emit).toHaveBeenCalledWith('agendamento');
  });

  it('should open modal when viewAppointmentDetails is called', () => {
    expect(component.isModalOpen).toBe(false);
    expect(component.selectedAppointment).toBeNull();
    
    component.viewAppointmentDetails();
    
    expect(component.isModalOpen).toBe(true);
    expect(component.selectedAppointment).toBeDefined();
    expect(component.selectedAppointment?.doctorName).toBe('João');
  });

  it('should close modal when closeAppointmentModal is called', () => {
    component.isModalOpen = true;
    component.selectedAppointment = {} as any;
    
    component.closeAppointmentModal();
    
    expect(component.isModalOpen).toBe(false);
    expect(component.selectedAppointment).toBeNull();
  });

  it('should have next appointment data', () => {
    expect(component.nextAppointment).toBeDefined();
    expect(component.nextAppointment.day).toBe('15');
    expect(component.nextAppointment.month).toBe('Jan');
    expect(component.nextAppointment.doctorName).toBe('Dr. João Silva');
    expect(component.nextAppointment.specialty).toBe('Cardiologia');
  });
});

