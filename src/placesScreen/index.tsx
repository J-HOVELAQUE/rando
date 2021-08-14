import CardPlace from "./components/CardPlace";
import { Place } from "../interfaces/place";
import { useEffect, useState } from "react";
import CreatePlaceModal from "./components/CreatePlaceModal";
import getPlaces from "./ajaxHandler/getPlace";
import "./placeScreenStyle.css";

export default function PlacesScreen(props) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [createPlace, setCreatePlace] = useState(false);

  useEffect(() => {
    getPlacesInState();
  }, []);

  async function getPlacesInState() {
    const placeResponse = await getPlaces();

    if (placeResponse.outcome === "SUCCESS") {
      setPlaces(placeResponse.data);
      return;
    }

    alert(placeResponse.errorCode);
  }

  const handleClose = () => {
    setCreatePlace(false);
    getPlacesInState();
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
