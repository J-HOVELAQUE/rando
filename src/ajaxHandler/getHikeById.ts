import { OutcomeSuccess, OutcomeFailure } from "../interfaces/outcomes";
import { PopulatedHike } from "../interfaces/hike";
const serverUrl = process.env.REACT_APP_SERVER_URL;

export default async function getHikesById(
  hikeId: string
): Promise<OutcomeFailure | OutcomeSuccess<PopulatedHike>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer: Response = await fetch(serverUrl + "/hike/" + hikeId, {
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
    data: answer.hike,
  };
}
