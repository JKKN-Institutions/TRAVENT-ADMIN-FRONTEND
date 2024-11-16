import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SpecificRouteLiveTracking from "../SpecificRouteLiveTracking/SpecificRouteLiveTracking";
import "./AllRoutesLiveTracking.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

// Securely set Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VyeWFwcmFiYWppY2F0ZSIsImEiOiJjbTJ0eTZobWowN3FvMmxzYnZ3d2U0ano3In0.Y8a_7KBrgntn93LRZSkn8A";

const destination = {
  coordinates: [77.73066889541872, 11.445432360467812],
  name: "JKKN Institution",
};

const busLocations = [
  {
    id: "36",
    status: "Delay",
    coordinates: [77.72966, 11.44443],
    location: "Gandhi Road",
  },
  {
    id: "11",
    status: "On-Time",
    coordinates: [77.73166, 11.44643],
    location: "Market Street",
  },
  {
    id: "15",
    status: "Early",
    coordinates: [77.73266, 11.44743],
    location: "College Road",
  },
  {
    id: "13",
    status: "On-Time",
    coordinates: [77.72866, 11.44343],
    location: "Railway Station",
  },
];

// Utility to calculate distance between coordinates
const calculateDistance = (coord1, coord2) => {
  const R = 6371;
  const [lat1, lon1] = coord1.map((deg) => (deg * Math.PI) / 180);
  const [lat2, lon2] = coord2.map((deg) => (deg * Math.PI) / 180);
  const deltaLat = lat2 - lat1;
  const deltaLon = lon2 - lon1;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
  return (2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
};

// Create the destination marker
const createDestinationMarker = () => {
  const el = document.createElement("div");
  el.className = "destination-marker";

  const markerContent = document.createElement("div");
  markerContent.className = "destination-content";
  const label = document.createElement("div");
  label.className = "destination-label";
  label.textContent = destination.name;
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-location-dot";

  markerContent.append(label, icon);
  el.append(markerContent);
  return el;
};

// Create each bus marker with status indicators and popups
const createBusMarker = (bus, mapInstance) => {
  const el = document.createElement("div");
  el.className = "bus-marker";

  const markerContent = document.createElement("div");
  markerContent.className = "marker-content";
  const routeNumber = document.createElement("div");
  routeNumber.className = "route-number";
  const statusDot = document.createElement("span");
  statusDot.className = `status-dot ${bus.status.toLowerCase()}`;
  const routeText = document.createElement("span");
  routeText.textContent = bus.id;

  routeNumber.append(statusDot, routeText);
  const busIcon = document.createElement("div");
  busIcon.className = "all-routes-live-tracking-bus-icon";
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-bus";

  busIcon.append(icon);
  markerContent.append(routeNumber, busIcon);
  el.append(markerContent);

  const distance = calculateDistance(bus.coordinates, destination.coordinates);
  const popupContent = `
    <div class="marker-popup">
      <h4>Bus ${bus.id}</h4>
      <p><strong>Location:</strong> ${bus.location}</p>
      <p><strong>Coordinates:</strong><br/>Lat: ${bus.coordinates[1]}<br/>Long: ${bus.coordinates[0]}</p>
      <p><strong>Distance to Destination:</strong> ${distance} km</p>
      <p><strong>Status:</strong> ${bus.status}</p>
    </div>
  `;

  const popup = new mapboxgl.Popup({
    closeButton: false,
    offset: [0, -30],
    className: "bus-popup",
  }).setHTML(popupContent);

  el.addEventListener("mouseenter", () => popup.addTo(mapInstance));
  el.addEventListener("mouseleave", () => popup.remove());

  return { element: el, popup, coordinates: bus.coordinates };
};

const AllRoutesLiveTracking = ({ onBack }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: destination.coordinates,
        zoom: 14,
        minZoom: 12,
        maxZoom: 18,
      });

      mapInstance.current.on("load", () => {
        // Add destination marker
        const destEl = createDestinationMarker();
        new mapboxgl.Marker({ element: destEl, anchor: "bottom" })
          .setLngLat(destination.coordinates)
          .addTo(mapInstance.current);

        // Add bus markers
        busLocations.forEach((bus) => {
          const { element, popup, coordinates } = createBusMarker(
            bus,
            mapInstance.current
          );
          const marker = new mapboxgl.Marker({ element, anchor: "bottom" })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(mapInstance.current);

          markersRef.current.push(marker);
        });
      });
    }

    return () => {
      if (mapInstance.current) {
        markersRef.current.forEach((marker) => marker.remove());
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  if (selectedBus) {
    return (
      <SpecificRouteLiveTracking
        routeId={selectedBus.id}
        onBack={() => setSelectedBus(null)}
      />
    );
  }

  return (
    <div className="all-routes-container">
      <TopBar title="All Routes Live Tracking" onBack={onBack} backButton />
      <div
        className="all-routes-live-tracking-map-container"
        ref={mapContainer}
      />
    </div>
  );
};

export default AllRoutesLiveTracking;
