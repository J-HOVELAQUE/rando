import CardPlace, { Place } from "./components/CardPlace";
import { useEffect, useState } from "react";
import CreatePlaceModal from "./components/CreatePlaceModal";
import "./placeScreenStyle.css";

const endPoint: string = "localhost:3000";

export default function PlacesScreen(props) {
  const [places, setPlaces] = useState([]);
  const [createPlace, setCreatePlace] = useState(false);

  useEffect(() => {
    getPlaces();
  }, []);

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

  const handleClose = () => {
    setCreatePlace(false);
    getPlaces();
  };
  const handleShow = () => setCreatePlace(true);

  return (
    <>
      <CreatePlaceModal createPlace={createPlace} handleClose={handleClose} />

      <h1 className="hiking-title">Lieux de randonnée</h1>
      <button className="add-place-button" onClick={() => handleShow()}>
        Ajouter un lieu
      </button>
      <div className="card-place-container">
        {places.map((place: Place) => {
          return <CardPlace key={place._id} placeData={place} />;
        })}
      </div>
    </>
  );
}
