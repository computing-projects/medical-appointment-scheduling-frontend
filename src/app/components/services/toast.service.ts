import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$: Observable<ToastMessage[]> = this.toastsSubject.asObservable();

  private defaultDuration = 5000; // 5 seconds

  show(message: string, type: 'success' | 'info' | 'error' | 'warning' = 'info', duration?: number): void {
    const toast: ToastMessage = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      message,
      type,
      duration: duration || this.defaultDuration
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    // Auto remove after duration
    setTimeout(() => {
      this.remove(toast.id);
    }, toast.duration);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  remove(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(toast => toast.id !== id));
  }

  clear(): void {
    this.toastsSubject.next([]);
  }
}

