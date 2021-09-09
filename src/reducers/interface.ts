import { DefaultRootState } from "react-redux";
import { Hike, PopulatedHike } from "../interfaces/hike";

export interface RootState extends DefaultRootState {
  activeHike: PopulatedHike | null;
}

export interface ISelectHike {
  type: "SELECT_HIKE";
  hike: PopulatedHike;
}

export interface IUnselectHike {
  type: "UNSELECT_HIKE";
}

export type IActions = ISelectHike | IUnselectHike;
