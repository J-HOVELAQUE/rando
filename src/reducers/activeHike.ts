import { Action } from "redux";
import { Hike, PopulatedHike } from "../interfaces/hike";

interface ActiveHikeAction extends Action {
  hike: Hike;
}

export default function (
  activeHike: PopulatedHike | null = null,
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
