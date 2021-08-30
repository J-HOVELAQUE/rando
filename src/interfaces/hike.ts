import Participant from "./participant";
import { Place } from "./place";

export interface Hike {
  _id?: string;
  /**
   * The hike may not have id if not already record in database
   */

  durationInMinutes: Number;
  elevationInMeters: Number;
  distanceInMeters: Number;
  startingAltitude: Number;
  arrivalAltitude: Number;
  description: String;
  date: Date;
  participants: string[];
  place: string;
}

export interface PopulatedHike {
  _id?: string;
  /**
   * The hike may not have id if not already record in database
   */

  durationInMinutes: Number;
  elevationInMeters: Number;
  distanceInMeters: Number;
  startingAltitude: Number;
  arrivalAltitude: Number;
  description: String;
  date: Date;
  participants: Participant[];
  place: Place;
}
