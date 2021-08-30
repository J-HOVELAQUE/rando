import { DefaultRootState } from "react-redux";
import { Hike } from "../interfaces/hike";

export interface RootState extends DefaultRootState {
  activeHike: Hike | null;
}

export type IActions = "SELECT_HIKE" | "UNSELECT_HIKE";

export interface ISelectHike {
  type: "SELECT_HIKE";
  hike: Hike;
}

export interface IUnselectHike {
  type: "UNSELECT_HIKE";
}
