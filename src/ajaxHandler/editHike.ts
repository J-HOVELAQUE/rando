import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface HikeUpdateData {
  durationInMinutes?: string;
  elevationInMeters?: string;
  distanceInMeters?: string;
  startingAltitude?: string;
  arrivalAltitude?: string;
  description?: string;
  date?: string;
  participants?: string[];
  place?: string;
}

interface UpdateResult {
  n: number;
  nModified: number;
  ok: number;
}

export default async function editHike(
  hikeId: string,
  hikeUpdateData: HikeUpdateData
): Promise<OutcomeFailure | OutcomeSuccess<UpdateResult>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/hike/" + hikeId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(hikeUpdateData),
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
