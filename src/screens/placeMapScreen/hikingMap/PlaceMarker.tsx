import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./placeMarkerStyle.css";
import getHikeForAPlace from "../../../ajaxHandler/getHikeForAPlace";
import prettyDate from "../../../services/prettyDate";
import { Redirect } from "react-router";
import getHikeById from "../../../ajaxHandler/getHikeById";
import { Dispatch } from "redux";
import { IActions } from "../../../reducers/interface";
import { PopulatedHike } from "../../../interfaces/hike";
import { connect } from "react-redux";

interface Coordinates {
  lat: number;
  long: number;
}

interface PlaceMarkerProps {
  placeId: string;
  placeName: string;
  coordinates: Coordinates;
  onLoadHike: (hike: PopulatedHike) => void;
}

interface HikeDataForPopup {
  hikeId: string;
  hikeDate: string;
}

function PlaceMarker(props: PlaceMarkerProps) {
  const [hikesForThisPlace, setHikesForThisPlace] = useState<
    HikeDataForPopup[]
  >([]);
  const [isRedirectToHikingSheet, setIsRedirectToHikingSheet] =
    useState<boolean>(false);

  const getPlaceData = async () => {
    const getHikeResult = await getHikeForAPlace(props.placeId);
    if (getHikeResult.outcome === "FAILURE") {
      alert("Get hike for this place failed" + getHikeResult.errorCode);
      return;
    }

    const usefullHikesData = getHikeResult.data.map((hike) => {
      return { hikeId: hike._id, hikeDate: prettyDate(hike.date) };
    });
    setHikesForThisPlace(usefullHikesData);
  };

  const loadingHikeAndRecordItInStore = async (hikeId: string) => {
    const loadingResult = await getHikeById(hikeId);

    if (loadingResult.outcome === "FAILURE") {
      alert("Impossible de charger les données " + loadingResult.errorCode);
      return;
    }

    props.onLoadHike(loadingResult.data);
    setIsRedirectToHikingSheet(true);

    console.log("Loading Hike", loadingResult.data);
  };

  return (
    <>
      {isRedirectToHikingSheet ? <Redirect to="/rando" /> : null}

      <Marker
        position={[props.coordinates.lat, props.coordinates.long]}
        eventHandlers={{
          click: () => {
            getPlaceData();
          },
        }}
      >
        <Popup>
          <h6 className="marker-popup-title">{props.placeName}</h6>
          {hikesForThisPlace.length === 0 ? (
            <p>Aucune sortie</p>
          ) : (
            <ListGroup>
              {hikesForThisPlace.map((hike) => (
                <ListGroup.Item
                  action
                  key={hike.hikeId}
                  onClick={() => {
                    loadingHikeAndRecordItInStore(hike.hikeId);
                  }}
                >
                  {hike.hikeDate}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Popup>
      </Marker>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<IActions>) => {
  return {
    onLoadHike: (hikeToLoad: PopulatedHike) => {
      dispatch({
        type: "SELECT_HIKE",
        hike: hikeToLoad,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(PlaceMarker);
