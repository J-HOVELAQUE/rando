export interface Place {
  _id?: string;
  /**
   * The place may not have id if not already record in database
   */

  name: string;
  mountainLocation: string;
  altitudeInMeters: number;
  picture?: string;
  city?: string;
}
