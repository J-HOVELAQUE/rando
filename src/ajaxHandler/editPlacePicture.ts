import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export default async function updatePlacePicture(
  placeId: string,
  pictureFile: File
): Promise<OutcomeFailure | OutcomeSuccess<string>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const data = new FormData();
  data.append("placePicture", pictureFile);

  const rawAnswer = await fetch(serverUrl + "/place/" + placeId + "/picture", {
    method: "PUT",
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
