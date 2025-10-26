// Rating utility functions
export class RatingUtils {
  /**
   * Gets array for filled stars
   */
  static getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  /**
   * Gets array for empty stars
   */
  static getEmptyStarsArray(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  /**
   * Formats rating to one decimal place
   */
  static formatRating(rating: number): string {
    return rating.toFixed(1);
  }

  /**
   * Gets rating category
   */
  static getRatingCategory(rating: number): 'excellent' | 'good' | 'average' | 'poor' {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 4.0) return 'good';
    if (rating >= 3.0) return 'average';
    return 'poor';
  }
}

