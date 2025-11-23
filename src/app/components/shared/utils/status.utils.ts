// Status utility functions
import { AppointmentStatus } from '../interfaces/appointment.interface';

export class StatusUtils {
  /**
   * Gets an icon for appointment status
   */
  static getStatusIcon(status: string): string {
    switch (status) {
      case 'Confirmada':
        return '✓';
      case 'Pendente':
      case 'Aguardando':
        return '⏱';
      case 'Cancelada':
        return '✗';
      case 'Realizada':
        return '✓✓';
      default:
        return '•';
    }
  }

  /**
   * Gets CSS class for appointment status
   */
  static getStatusClass(status: string): string {
    switch (status) {
      case 'Confirmada':
        return 'status-confirmada';
      case 'Pendente':
      case 'Aguardando':
        return 'status-pendente';
      case 'Cancelada':
        return 'status-cancelada';
      case 'Realizada':
        return 'status-realizada';
      default:
        return '';
    }
  }

  /**
   * Checks if status is positive
   */
  static isPositiveStatus(status: AppointmentStatus): boolean {
    return status === 'Confirmada' || status === 'Realizada';
  }

  /**
   * Checks if status is pending
   */
  static isPendingStatus(status: AppointmentStatus): boolean {
    return status === 'Pendente' || status === 'Aguardando';
  }
}

