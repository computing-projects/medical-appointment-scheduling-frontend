// Date utility functions
export class DateUtils {
  /**
   * Formats a Date to YYYY-MM-DD
   */
  static toISODateString(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  /**
   * Checks if two dates are the same day
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  /**
   * Checks if a date is today
   */
  static isToday(date: Date | null): boolean {
    if (!date) return false;
    return this.isSameDay(date, new Date());
  }

  /**
   * Gets the number of days in a month
   */
  static getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  /**
   * Gets the first day of week for a month (0 = Sunday)
   */
  static getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  /**
   * Formats date to Brazilian format (DD/MM/YYYY)
   */
  static toBrazilianFormat(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  /**
   * Formats date with time to Brazilian format
   */
  static toBrazilianFormatWithTime(date: Date): string {
    return date.toLocaleString('pt-BR');
  }
}

