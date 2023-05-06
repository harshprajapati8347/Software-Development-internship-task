import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet/hooks";
import { MapContainer, TileLayer } from "react-leaflet";

// import L, { map, marker } from "leaflet";

import raw1 from "./data.json";

import MarkerCluster from "./MarkerCluster";

const EmployeeMap = () => {
  useEffect(() => {
    console.log(raw1);
    setMarkers(raw1);

    // chnage
  }, []);

  const [markers, setMarkers] = useState([]);

  let [idSelect, changeId] = useState(1);
  let [latRef, changeLat] = useState(0);
  let [lngRef, changeLng] = useState(0);

  let onChangeId = (event) => {
    let newId = parseInt(event.target.value);
    changeId(newId);
    changeLat(markers[newId - 1].position.lat);
    changeLng(markers[newId - 1].position.lng);
  };

  let onSubmitForm = (event) => {
    event.preventDefault();
    console.log("Submitting!");

    let newMarkers = JSON.parse(JSON.stringify(markers));

    newMarkers[idSelect - 1].position.lat = parseFloat(latRef);
    newMarkers[idSelect - 1].position.lng = parseFloat(lngRef);

    mapIns.setView([parseFloat(latRef), parseFloat(lngRef)], 16);

    setMarkers(newMarkers);
  };

  let [mapIns, changeMap] = useState();

  function MyComponent() {
    const map = useMap();
    changeMap(map);

    return <></>;
  }

  return (
    <div>
      <MapContainer
        center={[17.44, 78.466]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "600px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MarkerCluster markers={markers} />
        <MyComponent />
      </MapContainer>
      <div>
        <h2>Edit Location</h2>
        <form action="" onSubmit={onSubmitForm}>
          <select name="id" id="id" onChange={onChangeId}>
            {markers.map((elmt) => {
              return <option value={`${elmt.id}`}>{elmt.id}</option>;
            })}
          </select>
          <div>
            Latitude{" "}
            <input
              type="number"
              name="lat"
              id="lat"
              value={latRef}
              onInput={(event) => changeLat(event.target.value)}
            />
            Longitude{" "}
            <input
              type="number"
              name="lng"
              id="lng"
              value={lngRef}
              onInput={(event) => changeLng(event.target.value)}
            />
          </div>
          <button type="submit">Edit!</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeMap;
