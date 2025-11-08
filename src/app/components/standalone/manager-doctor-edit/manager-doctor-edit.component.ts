import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Doctor {
  id: number;
  photo: string;
  name: string;
  specialty: string;
  crm: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  patientsCount: number;
  rating: number;
}

@Component({
  selector: 'med-manager-doctor-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  ngOnInit(): void {
    this.loadMockDoctors();
    this.applyFilters();
  }

  loadMockDoctors(): void {
    this.doctors = [
      {
        id: 1,
        photo: 'https://i.pravatar.cc/150?img=12',
        name: 'Dr. Carlos Eduardo Silva',
        specialty: 'Cardiologia',
        crm: 'SP/123456',
        email: 'carlos.silva@clinic.com',
        phone: '(11) 98765-4321',
        status: 'active',
        patientsCount: 245,
        rating: 4.8
      },
      {
        id: 2,
        photo: 'https://i.pravatar.cc/150?img=5',
        name: 'Dra. Maria Santos Oliveira',
        specialty: 'Pediatria',
        crm: 'SP/789012',
        email: 'maria.santos@clinic.com',
        phone: '(11) 97654-3210',
        status: 'active',
        patientsCount: 312,
        rating: 4.9
      },
      {
        id: 3,
        photo: 'https://i.pravatar.cc/150?img=33',
        name: 'Dr. João Paulo Costa',
        specialty: 'Ortopedia',
        crm: 'SP/345678',
        email: 'joao.costa@clinic.com',
        phone: '(11) 96543-2109',
        status: 'inactive',
        patientsCount: 187,
        rating: 4.6
      },
      {
        id: 4,
        photo: 'https://i.pravatar.cc/150?img=20',
        name: 'Dra. Ana Paula Ferreira',
        specialty: 'Dermatologia',
        crm: 'SP/901234',
        email: 'ana.ferreira@clinic.com',
        phone: '(11) 95432-1098',
        status: 'active',
        patientsCount: 198,
        rating: 4.7
      },
      {
        id: 5,
        photo: 'https://i.pravatar.cc/150?img=68',
        name: 'Dr. Roberto Almeida Lima',
        specialty: 'Neurologia',
        crm: 'SP/567890',
        email: 'roberto.lima@clinic.com',
        phone: '(11) 94321-0987',
        status: 'active',
        patientsCount: 156,
        rating: 4.5
      }
    ];
  }

  applyFilters(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = !this.searchTerm || 
        doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.crm.toLowerCase().includes(this.searchTerm.toLowerCase());
      
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
}
