import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faBus,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Bus } from "lucide-react"; // Import the Bus icon from lucide-react
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import SpecificRouteLiveTracking from "../SpecificRouteLiveTracking/SpecificRouteLiveTracking";
import "./AllRoutesLiveTracking.css";

ChartJS.register(ArcElement, Tooltip, Legend);

// Replace with your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VyeWFwcmFiYWppY2F0ZSIsImEiOiJjbTJ0eTZobWowN3FvMmxzYnZ3d2U0ano3In0.Y8a_7KBrgntn93LRZSkn8A";

const AllRoutesLiveTracking = ({ onBack }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);

  // Define destination point

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

  const arrivalData = {
    labels: ["Early", "On-Time", "Slightly Delay", "Delay", "Over Delay"],
    datasets: [
      {
        data: [18, 9, 5, 3, 1],
        backgroundColor: [
          "#32CD32",
          "#00BFFF",
          "#FFD700",
          "#FF4500",
          "#DC143C",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const lat1 = (coord1[1] * Math.PI) / 180;
    const lat2 = (coord2[1] * Math.PI) / 180;
    const deltaLat = ((coord2[1] - coord1[1]) * Math.PI) / 180;
    const deltaLon = ((coord2[0] - coord1[0]) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2);
  };

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

    markerContent.appendChild(label);
    markerContent.appendChild(icon);
    el.appendChild(markerContent);

    return el;
  };

  const createBusMarker = (bus) => {
    const el = document.createElement("div");
    el.className = "bus-marker";

    // // Make the entire marker clickable
    // el.style.cursor = "pointer";
    // el.addEventListener("click", () => {
    //   setSelectedBus(bus);
    // });

    const markerContent = document.createElement("div");
    markerContent.className = "marker-content";

    const routeNumber = document.createElement("div");
    routeNumber.className = "route-number";

    const statusDot = document.createElement("span");
    statusDot.className = `status-dot ${bus.status.toLowerCase()}`;

    const routeText = document.createElement("span");
    routeText.textContent = bus.id;

    routeNumber.appendChild(statusDot);
    routeNumber.appendChild(routeText);

    const busIcon = document.createElement("div");
    busIcon.className = "all-routes-live-tracking-bus-icon";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-bus";
    busIcon.appendChild(icon);

    markerContent.appendChild(routeNumber);
    markerContent.appendChild(busIcon);
    el.appendChild(markerContent);

    const distance = calculateDistance(
      bus.coordinates,
      destination.coordinates
    );
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
      closeOnClick: false,
      offset: [0, -30],
      className: "bus-popup",
    }).setHTML(popupContent);

    el.addEventListener("mouseenter", () => popup.addTo(map.current));
    el.addEventListener("mouseleave", () => popup.remove());

    return { element: el, popup, coordinates: bus.coordinates };
  };

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: destination.coordinates,
        zoom: 14,
        minZoom: 12,
        maxZoom: 18,
      });

      map.current.on("load", () => {
        const destEl = createDestinationMarker();
        const destMarker = new mapboxgl.Marker({
          element: destEl,
          anchor: "bottom",
        })
          .setLngLat(destination.coordinates)
          .addTo(map.current);

        // Create bus markers only once
        busLocations.forEach((bus) => {
          const { element, popup, coordinates } = createBusMarker(bus);
          const marker = new mapboxgl.Marker({
            element: element,
            anchor: "bottom",
          })
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map.current);

          // Save the marker in ref to avoid re-adding it
          markersRef.current.push({ marker, id: bus.id });
        });
      });
    }

    return () => {
      if (map.current) {
        markersRef.current.forEach(({ marker }) => marker.remove());
        markersRef.current = [];
        map.current.remove();
        map.current = null;
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
      <header className="all-routes-live-tracking-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="all-routes-live-tracking-back-icon"
          onClick={onBack}
        />
        <h2>All Routes Live Tracking</h2>
      </header>

      <div
        className="all-routes-live-tracking-map-container"
        ref={mapContainer}
      />

      {/* <div className="arrival-status">
        <h3>Arrival Status</h3>
        <div className="chart-container">
          <Pie data={arrivalData} options={chartOptions} />
        </div>
      </div> */}
    </div>
  );
};

export default AllRoutesLiveTracking;
