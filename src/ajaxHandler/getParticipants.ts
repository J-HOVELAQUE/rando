import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";
import Participant, { RecordedParticipant } from "../interfaces/participant";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default async function getParticipants(): Promise<
  OutcomeFailure | OutcomeSuccess<RecordedParticipant[]>
> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer: Response = await fetch(serverUrl + "/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!rawAnswer.ok) {
    return {
      outcome: "FAILURE",
      errorCode: "NO_SERVER_RESPONSE",
    };
  }

  const answer = await rawAnswer.json();

  return {
    outcome: "SUCCESS",
    data: answer.places,
  };
}
