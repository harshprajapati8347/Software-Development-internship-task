import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useMap } from "react-leaflet/hooks";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    mcg.clearLayers();
    markers.forEach((elmt) =>
      L.marker(new L.LatLng(elmt.position.lat, elmt.position.lng))
        .addTo(mcg)
        .bindPopup(
          `<span> <div>Employee ID: ${elmt.id}</div><div>Name: ${elmt.name}</div><div>Department: ${elmt.department}</div><div>City: ${elmt.city}</div> </span>`
        )
    );

    console.log("Marker Change?");

    map.addLayer(mcg);
  }, [markers, map]);

  return <></>;
};

export default MarkerCluster;
