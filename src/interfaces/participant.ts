export default interface Participant {
  _id?: string;
  /**
   * The participant may not have id if not already record in database
   */

  name: string;
  firstname: string;
  email: string;
  dateOfBirth?: Date;
  photo?: string;
}
