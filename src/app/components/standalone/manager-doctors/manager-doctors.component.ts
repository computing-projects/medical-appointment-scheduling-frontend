import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ManagerDoctorRegisterComponent } from '../manager-doctor-register/manager-doctor-register.component';
import { ManagerDoctorEditComponent } from '../manager-doctor-edit/manager-doctor-edit.component';

@Component({
  selector: 'med-manager-doctors',
  standalone: true,
  imports: [CommonModule, ManagerDoctorRegisterComponent, ManagerDoctorEditComponent],
  templateUrl: './manager-doctors.component.html',
  styleUrl: './manager-doctors.component.scss'
})
export class ManagerDoctorsComponent implements OnInit {
  selectedTab: 'cadastrar' | 'editar' = 'cadastrar';

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const tabParam = this.route.snapshot.queryParams['tab'];
    if (tabParam === 'editar' || tabParam === 'cadastrar') {
      this.selectedTab = tabParam;
      this.cdr.markForCheck();
    }

    this.route.queryParams.subscribe((params) => {
      const tabParam = params['tab'];
      if (tabParam === 'editar' || tabParam === 'cadastrar') {
        this.selectedTab = tabParam;
        this.cdr.markForCheck();
      }
    });
  }

  selectTab(tab: 'cadastrar' | 'editar'): void {
    this.selectedTab = tab;
  }
}
