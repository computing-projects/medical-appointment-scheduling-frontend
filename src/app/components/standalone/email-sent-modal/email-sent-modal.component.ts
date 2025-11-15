import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'med-email-sent-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-sent-modal.component.html',
  styleUrls: ['./email-sent-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailSentModalComponent{
  @HostBinding('class.med-email-sent-modal') isActive = true;

  @Input() emailModalOpen = false;
  @Output() close = new EventEmitter<void>();

  @ViewChild('firstField') firstField!: ElementRef<HTMLInputElement>;
  @ViewChild('card') card!: ElementRef<HTMLDivElement>;

  onBackdrop(event: MouseEvent) {
    if (!this.card) return;
    if (!this.card.nativeElement.contains(event.target as Node)) {
      this.close.emit();
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close.emit();
    }
  }
}
