import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface ParticipantUpdateData {
  name?: string;
  firstname?: string;
  email?: string;
  dateOfBirth?: string;
}

interface UpdateResult {
  n: number;
  nModified: number;
  ok: number;
}

export default async function editParticipant(
  participantId: string,
  participantUpdateData: ParticipantUpdateData
): Promise<OutcomeFailure | OutcomeSuccess<UpdateResult>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/user/" + participantId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participantUpdateData),
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
    data: answer.result,
  };
}
