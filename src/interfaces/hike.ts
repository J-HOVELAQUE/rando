import Participant from "./participant";
import { Place } from "./place";

export interface Hike {
  _id?: string;
  /**
   * The hike may not have id if not already record in database
   */

  durationInMinutes: string;
  elevationInMeters: string;
  distanceInMeters: string;
  startingAltitude: string;
  arrivalAltitude: string;
  description: string;
  date: string;
  participants: string[];
  place: string;
}

export interface PopulatedHike {
  _id: string;
  /**
   * The hike may not have id if not already record in database
   */

  durationInMinutes: string;
  elevationInMeters: string;
  distanceInMeters: string;
  startingAltitude: string;
  arrivalAltitude: string;
  description: string;
  date: string;
  participants: Participant[];
  place: Place;
}
