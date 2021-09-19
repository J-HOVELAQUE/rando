import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface ICoordinates {
  lat: number;
  long: number;
}

interface UpdateResult {
  n: number;
  nModified: number;
  ok: number;
}

export default async function setPlaceLocation(
  placeId: string,
  newCoordinates: ICoordinates
): Promise<OutcomeFailure | OutcomeSuccess<UpdateResult>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/place/" + placeId + "/location", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCoordinates),
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
