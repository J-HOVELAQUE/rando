import { OutcomeFailure, OutcomeSuccess } from "../interfaces/outcomes";

const serverUrl = process.env.REACT_APP_SERVER_URL;

interface DeleteResult {
  deletedCount: number;
  n: number;
  ok: number;
}

export default async function deleteHike(
  hikeId: string
): Promise<OutcomeFailure | OutcomeSuccess<DeleteResult>> {
  if (serverUrl === undefined) {
    return {
      outcome: "FAILURE",
      errorCode: "UNKNOW_SERVER",
    };
  }

  const rawAnswer = await fetch(serverUrl + "/hike/" + hikeId, {
    method: "DELETE",
  });

  const answer = await rawAnswer.json();

  if (!rawAnswer.ok) {
    return {
      outcome: "FAILURE",
      errorCode: "BAD_REQUEST",
      detail: answer.reason,
    };
  }

  return {
    outcome: "SUCCESS",
    data: answer.result,
  };
}
