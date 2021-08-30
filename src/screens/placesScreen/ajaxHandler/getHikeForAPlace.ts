import { OutcomeSuccess, OutcomeFailure } from "../../../interfaces/outcomes";
import { Hike } from "../../../interfaces/hike";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default async function getHikesForAPlace(
  placeId: string
): Promise<OutcomeFailure | OutcomeSuccess<Hike[]>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer: Response = await fetch(
    serverUrl + "/hike/byPlace/" + placeId,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!rawAnswer.ok) {
    return {
      outcome: "FAILURE",
      errorCode: "NO_SERVER_RESPONSE",
    };
  }

  const answer = await rawAnswer.json();

  return {
    outcome: "SUCCESS",
    data: answer.hikes,
  };
}
