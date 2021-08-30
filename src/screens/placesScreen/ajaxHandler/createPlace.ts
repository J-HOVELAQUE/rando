import { OutcomeFailure, OutcomeSuccess } from "../../../interfaces/outcomes";
import { Place } from "../../../interfaces/place";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface PlaceToRecord {
  name: string;
  altitudeInMeters: number;
  mountainLocation: string;
  picture: File | null;
}

export default async function createPlace(
  placeToRecord: PlaceToRecord
): Promise<OutcomeFailure | OutcomeSuccess<Place[]>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const data = new FormData();
  data.append("name", placeToRecord.name);
  data.append("altitudeInMeters", placeToRecord.altitudeInMeters.toString());
  data.append("mountainLocation", placeToRecord.mountainLocation);

  if (placeToRecord.picture !== null) {
    data.append("placePicture", placeToRecord.picture);
  }

  const rawAnswer = await fetch(serverUrl + "/place", {
    method: "POST",
    body: data,
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
    data: answer,
  };
}
