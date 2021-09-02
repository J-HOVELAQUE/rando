import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";
import Participant from "../interfaces/participant";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface ParticipantToCreate {
  name: string;
  firstname: string;
  email: string;
  dateOfBirth?: string;
  photo?: string;
}

export default async function createParticipant(
  participantToRecord: ParticipantToCreate
): Promise<OutcomeFailure | OutcomeSuccess<Participant>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantToRecord),
  });

  const answer = await rawAnswer.json();

  if (!rawAnswer.ok) {
    return {
      outcome: "FAILURE",
      errorCode: "BAD_REQUEST",
      detail: answer,
    };
  }

  return {
    outcome: "SUCCESS",
    data: answer.user,
  };
}
