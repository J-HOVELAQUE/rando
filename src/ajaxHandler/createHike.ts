import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";
import { Hike } from "../interfaces/hike";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default async function createHike(
  hikeToRecord: Hike
): Promise<OutcomeFailure | OutcomeSuccess<Hike>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/hike", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hikeToRecord),
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
    data: answer.hike,
  };
}
