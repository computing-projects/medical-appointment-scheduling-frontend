import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'med-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent {
  // Dashboard data (in a real app, this would come from a service)
  adminName = 'Administrador';
  totalUsers = 1247;
  totalDoctors = 89;
  totalAppointments = 3421;

  constructor(private authService: AuthenticationService) {}

  displayUserName(): string | undefined {
    if (this.authService.getUser()?.name !== undefined)
      return this.authService.getUser()?.name
    else return '';
  }
}

