import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";
import { Place } from "../interfaces/place";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface PlaceUpdateData {
  name?: string;
  altitudeInMeters?: string;
  mountainLocation?: string;
}

interface UpdateResult {
  n: number;
  nModified: number;
  ok: number;
}

export default async function editPlace(
  placeId: string,
  placeUpdateData: PlaceUpdateData
): Promise<OutcomeFailure | OutcomeSuccess<UpdateResult>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/place/" + placeId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(placeUpdateData),
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
