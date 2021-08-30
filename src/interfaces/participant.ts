export default interface Participant {
  name: string;
  firstname: string;
  email: string;
  dateOfBirth?: Date;
  photo?: string;
}

export interface RecordedParticipant extends Participant {
  _id: string;
}
