import { Action } from "redux";
import { Hike } from "../interfaces/hike";

interface ActiveHikeAction extends Action {
  hike: Hike;
}

export default function (
  activeHike: Hike | null = null,
  action: ActiveHikeAction
) {
  switch (action.type) {
    case "SELECT_HIKE":
      const newHike: Hike = { ...action.hike };
      return newHike;

    case "UNSELECT_HIKE":
      return null;

    default:
      return activeHike;
  }
}
