import { Action } from "redux";
import { Hike } from "../interfaces/hike";

interface ActiveHikeAction extends Action {
  hike: Hike;
}

export default function (
  activeHike: Hike | undefined = undefined,
  action: ActiveHikeAction
) {
  switch (action.type) {
    case "SELECT_HIKE":
      return { ...action.hike };

    case "UNSELECT_HIKE":
      return undefined;

    default:
      return activeHike;
  }
}
