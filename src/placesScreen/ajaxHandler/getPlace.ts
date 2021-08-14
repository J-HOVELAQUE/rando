import { OutcomeFailure, OutcomeSuccess } from "../../interfaces/outcomes";
import { Place } from "../../interfaces/place";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default async function getPlaces(): Promise<
  OutcomeFailure | OutcomeSuccess<Place[]>
> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer: Response = await fetch(serverUrl + "/place", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!rawAnswer.ok) {
    console.log("PROBLEME");
    return {
      outcome: "FAILURE",
      errorCode: "NO_SERVER_RESPONSE",
    };
  }
  const answer = await rawAnswer.json();

  return {
    outcome: "SUCCESS",
    data: answer,
  };
}
