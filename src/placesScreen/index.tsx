import CardPlace, { Place } from "./components/CardPlace";
import { useEffect, useState } from "react";
import CreatePlaceModal from "./components/CreatePlaceModal";
import "./placeScreenStyle.css";

const endPoint: string = "localhost:3000";

export default function PlacesScreen(props) {
  const [places, setPlaces] = useState([]);
  const [createPlace, setCreatePlace] = useState(false);

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

  const handleClose = () => setCreatePlace(false);
  const handleShow = () => setCreatePlace(true);

  return (
    <>
      <CreatePlaceModal createPlace={createPlace} handleClose={handleClose} />

      <h1 className="hikingTitle">Lieux de randonnée</h1>
      <button className="addPlace" onClick={() => handleShow()}>
        Ajouter un lieu
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {places.map((place: Place) => {
          return <CardPlace key={place._id} placeData={place} />;
        })}
      </div>
    </>
  );
}
