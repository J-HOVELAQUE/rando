import CardPlace from "./components/CardPlace";
import { useEffect, useState } from "react";

const endPoint: string = "localhost:3000";

interface Place {
  id: string;
  name: string;
  altitudeInMeters: number;
  mountainLocation: string;
  city?: string;
  picture?: string;
}

export default function PlacesScreen(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getPlaces() {
      const rawAnswer = await fetch("http://localhost:3000/place", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const answer = await rawAnswer.json();
      setPlaces(answer.places);
    }
    getPlaces();
  }, []);
  return (
    <>
      <h1 className="hikingTitle">Lieux de randonnée</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
        <CardPlace />
      </div>
    </>
  );
}
