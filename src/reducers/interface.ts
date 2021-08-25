import { DefaultRootState } from "react-redux";
import { Hike } from "../interfaces/hike";

export default interface RootState extends DefaultRootState {
  activeHike: Hike | null;
}
