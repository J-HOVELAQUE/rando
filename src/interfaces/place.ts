type Coordinates = [number, number];

interface Location {
  type?: "Point";
  coordinates: Coordinates;
}

export interface Place {
  _id: string;
  name: string;
  mountainLocation: string;
  altitudeInMeters: number;
  picture?: string;
  city?: string;
  location: Location;
}
