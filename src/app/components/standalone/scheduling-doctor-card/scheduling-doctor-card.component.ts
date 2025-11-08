import { Component, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { DoctorSummary } from '../scheduling-doctor-search-list/scheduling-doctor-search-list.component';

@Component({
  selector: 'med-scheduling-doctor-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheduling-doctor-card.component.html',
  styleUrl: './scheduling-doctor-card.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class SchedulingDoctorCardComponent {
  @Input() doctor!: DoctorSummary;
  @Output() info = new EventEmitter<void>();
  @Output() agenda = new EventEmitter<void>();
}