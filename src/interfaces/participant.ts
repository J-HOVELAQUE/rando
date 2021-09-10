export default interface Participant {
  name: string;
  firstname: string;
  email: string;
  dateOfBirth?: string;
  photo?: string;
}

export interface RecordedParticipant extends Participant {
  _id: string;
}
