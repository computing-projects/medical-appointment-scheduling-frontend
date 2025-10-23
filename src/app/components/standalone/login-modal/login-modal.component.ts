import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import {MatIconModule} from '@angular/material/icon';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { take } from 'rxjs';
import { LoginUser } from '../../models/api-models';

@Component({
  selector: 'med-login-modal',
  standalone: true,
  imports: [ClarityModule, FormsModule, MatIconModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginModalComponent implements AfterViewInit {

  @HostBinding('class.med-modal') isActive = true;

  @Input() modalOpen: boolean = false;
  @Input() open = false;
  @Input() title = 'MedSim';
  @Input() ctaText = 'Entrar';

  @Output() close = new EventEmitter<void>();
  @Output() forgot = new EventEmitter<void>();
  @Output() signup = new EventEmitter<void>();

  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  @ViewChild('card') cardRef!: ElementRef<HTMLElement>;
  private firstFocusable?: HTMLElement;
  private lastFocusable?: HTMLElement;

  constructor(
    private authService: AuthenticationService
  ) {}

  ngAfterViewInit() {
    queueMicrotask(() => {
      const card = this.cardRef?.nativeElement;
      const focusables = card?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables && focusables.length) {
        this.firstFocusable = focusables[0];
        this.lastFocusable = focusables[focusables.length - 1];
        this.firstFocusable.focus();
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.close.emit();
  }

  onBackdrop(ev: MouseEvent) {
    if (ev.target === ev.currentTarget) this.close.emit();
  }

  submit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginUser: LoginUser = {
      email: this.email,
      password: this.password
    };

    this.authService.signin(loginUser)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.authService.setCurrentUser(response);
          this.close.emit();
          console.log('Login realizado com sucesso:', response);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Erro ao fazer login. Verifique suas credenciais.';
          console.error('Erro no login:', err);
        }
      });
  }

  focusFirst() {
    this.firstFocusable?.focus();
  }
  focusLast() {
    this.lastFocusable?.focus();
  }
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close.emit();
    }
  }
}
