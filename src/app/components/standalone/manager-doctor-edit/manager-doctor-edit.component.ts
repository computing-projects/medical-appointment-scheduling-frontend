import { Speciality } from './../../models/api-models';
import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Doctor {
  id: number;
  photo: string;
  name: string;
  cpf : string;
  crm: string;
  cidade: string;
  estado: string;
  cep: string;
  plans: string[];
  specialtys: string[];
  email: string;
  phone: string;
  avgAppointmentTime: number;
  status: 'active' | 'inactive';
  patientsCount: number;
  rating: number;
}

@Component({
  selector: 'med-manager-doctor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './manager-doctor-edit.component.html',
  styleUrl: './manager-doctor-edit.component.scss'
})
export class ManagerDoctorEditComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm = '';
  filterStatus: 'all' | 'active' | 'inactive' = 'all';
  selectedDoctor: Doctor | null = null;
  showViewModal = false;
  showEditModal = false;
  showDeleteConfirm = false;
  plansOpen = false;
  specialtiesOpen = false;
  statusOpen = false;

  plans: string[] = [];
  specialties: string[] = [];
  statusList: { label: string; value: string }[] = [];
  ngOnInit(): void {
    this.loadMockDoctors();
    this.applyFilters();
  }

  loadMockDoctors(): void {
    this.plans = [
      "Unimed",
      "Bradesco Saúde",
      "Amil",
      "SulAmérica",
      "NotreDame Intermédica",
      "Hapvida",
      "Porto Seguro Saúde",
      "Particular"
    ];

    this.specialties = [
      "Cardiologia",
      "Dermatologia",
      "Pediatria",
      "Ortopedia",
      "Ginecologia",
      "Neurologia",
      "Psiquiatria",
      "Oftalmologia",
      "Endocrinologia",
      "Urologia"
    ];
    this.statusList = [
      { label: 'Ativo', value: 'active' },
      { label: 'Inativo', value: 'inactive' }
    ];
    this.doctors = [
      {
        id: 1,
        photo: 'https://i.pravatar.cc/150?img=12',
        name: 'Dr. Carlos Eduardo Silva',
        specialtys: ['Cardiologia'],
        plans: ['Unimed', 'Amil'],
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '13506000',
        cpf: '12345678912345',
        crm: 'SP/123456',
        email: 'carlos.silva@clinic.com',
        phone: '(11) 98765-4321',
        status: 'active',
        avgAppointmentTime: 30,
        patientsCount: 245,
        rating: 4.8
      },
      {
        id: 2,
        photo: 'https://i.pravatar.cc/150?img=5',
        name: 'Dra. Maria Santos Oliveira',
       specialtys: ['Pediatria'],
        crm: 'SP/789012',
        plans: ['Bradesco Saúde', 'Particular'],
        cidade: 'Campinas',
        estado: 'SP',
        cep: '13010000',
        cpf: '98765432198765',
        email: 'maria.santos@clinic.com',
        phone: '(11) 97654-3210',
        status: 'active',
        avgAppointmentTime: 25,
        patientsCount: 312,
        rating: 4.9
      },
      {
        id: 3,
        photo: 'https://i.pravatar.cc/150?img=33',
        name: 'Dr. João Paulo Costa',
        specialtys: ['Ortopedia'],
        crm: 'SP/345678',
        plans: ['SulAmérica', 'Hapvida'],
        cidade: 'Santos',
        estado: 'SP',
        cep: '11010000',
        cpf: '45678912345678',
        email: 'joao.costa@clinic.com',
        phone: '(11) 96543-2109',
        status: 'inactive',
        avgAppointmentTime: 40,
        patientsCount: 187,
        rating: 4.6
      },
      {
        id: 4,
        photo: 'https://i.pravatar.cc/150?img=20',
        name: 'Dra. Ana Paula Ferreira',
        specialtys: ['Dermatologia'],
        crm: 'SP/901234',
        email: 'ana.ferreira@clinic.com',
        phone: '(11) 95432-1098',
        plans: ['NotreDame Intermédica', 'Porto Seguro Saúde'],
        cidade: 'Ribeirão Preto',
        estado: 'SP',
        cep: '14010000',
        cpf: '32165498732165',
        avgAppointmentTime: 20,
        status: 'active',
        patientsCount: 198,
        rating: 4.7
      },
      {
        id: 5,
        photo: 'https://i.pravatar.cc/150?img=68',
        name: 'Dr. Roberto Almeida Lima',
        specialtys: ['Neurologia'],
        crm: 'SP/567890',
        email: 'roberto.lima@clinic.com',
        phone: '(11) 94321-0987',
        status: 'active',
        plans: ['Unimed', 'Amil', 'Particular'],
        cidade: 'Sorocaba',
        estado: 'SP',
        cep: '18010000',
        cpf: '78912345678912',
        avgAppointmentTime: 35,
        patientsCount: 156,
        rating: 4.5
      }
    ];
  }

  applyFilters(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = !this.searchTerm ||
        doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.specialtys.filter(a => a.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.crm.toLowerCase().includes(this.searchTerm.toLowerCase()))

      const matchesStatus = this.filterStatus === 'all' || doctor.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  viewDoctor(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.showViewModal = true;
  }

  editDoctor(doctor: Doctor): void {
    this.selectedDoctor = { ...doctor };
    this.showEditModal = true;
  }

  confirmDelete(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.showDeleteConfirm = true;
  }

  deleteDoctor(): void {
    if (this.selectedDoctor) {
      const index = this.doctors.findIndex(d => d.id === this.selectedDoctor!.id);
      if (index > -1) {
        this.doctors.splice(index, 1);
        this.applyFilters();
      }
      this.closeDeleteConfirm();
    }
  }

  saveEdit(): void {
    if (this.selectedDoctor) {
      const index = this.doctors.findIndex(d => d.id === this.selectedDoctor!.id);
      if (index > -1) {
        this.doctors[index] = { ...this.selectedDoctor };
        this.applyFilters();
      }
      this.closeEditModal();
    }
  }

  toggleStatus(doctor: Doctor): void {
    const index = this.doctors.findIndex(d => d.id === doctor.id);
    if (index > -1) {
      this.doctors[index].status = this.doctors[index].status === 'active' ? 'inactive' : 'active';
      this.applyFilters();
    }
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedDoctor = null;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.selectedDoctor = null;
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.selectedDoctor = null;
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStarArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  toggleDropdown(field: 'plansOpen' | 'specialtiesOpen' | 'statusOpen') {
    this[field] = !this[field];
  }

  closeDropdown(field: 'plansOpen' | 'specialtiesOpen' | 'statusOpen') {
    // pequeno delay para não fechar antes de clicar
    setTimeout(() => this[field] = false, 50);
  }

  toggleSelection(item: string, field: 'plans' | 'specialtys', event: Event) {
    event.stopPropagation();

    const list = this.selectedDoctor ? this.selectedDoctor[field] : [];

    const index = list.indexOf(item);

    if (index >= 0) {
      list.splice(index, 1); // remove
    } else {
      list.push(item); // adiciona
    }
  }

  selectStatus(st: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedDoctor) {
      this.selectedDoctor.status = st as 'active' | 'inactive';
    }
    this.statusOpen = false;
  }
}
