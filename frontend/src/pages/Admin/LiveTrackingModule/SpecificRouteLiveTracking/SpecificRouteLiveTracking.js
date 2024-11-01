import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faChevronUp,
  faSearchPlus,
  faSearchMinus,
} from "@fortawesome/free-solid-svg-icons";
import "./SpecificRouteLiveTracking.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VyeWFwcmFiYWppY2F0ZSIsImEiOiJjbTJ0eTZobWowN3FvMmxzYnZ3d2U0ano3In0.Y8a_7KBrgntn93LRZSkn8A";

const SpecificRouteLiveTracking = ({ routeData, initialZoom, onBack }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const busMarkerRef = useRef(null);
  const [showStops, setShowStops] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const maxZoom = 18;
  const minZoom = 10;

  const routeId = routeData.routeNo;

  const busRoute = {
    id: routeId,
    stops: [
      {
        name: "Seelanaickenpatty",
        time: "07:45 AM",
        status: "completed",
        passengers: 10,
        coordinates: [77.72966, 11.44443],
      },
      {
        name: "Kakapalyam",
        time: "08:05 AM",
        status: "next",
        passengers: 18,
        coordinates: [77.73066, 11.44543],
        distance: "24.8 km",
      },
      {
        name: "Sankagiri",
        time: "08:25 AM",
        status: "pending",
        passengers: 20,
        coordinates: [77.73166, 11.44643],
      },
      {
        name: "Valayakaranur",
        time: "08:45 AM",
        status: "pending",
        passengers: 13,
        coordinates: [77.73266, 11.44743],
      },
      {
        name: "JKKN Institution",
        time: "08:50 AM",
        status: "destination",
        coordinates: [77.73066889541872, 11.445432360467812],
      },
    ],
  };

  const calculateNextPosition = (start, end, progress) => {
    return [
      start[0] + (end[0] - start[0]) * progress,
      start[1] + (end[1] - start[1]) * progress,
    ];
  };

  const getStopStatus = (currentStopIndex, index) => {
    if (index < currentStopIndex) return "completed";
    if (index === currentStopIndex) return "next";
    if (index === busRoute.stops.length - 1) return "destination";
    return "pending";
  };

  const moveToNextStop = () => {
    if (currentStopIndex >= busRoute.stops.length - 1) {
      setIsMoving(false);
      return;
    }

    const currentStop = busRoute.stops[currentStopIndex];
    const nextStop = busRoute.stops[currentStopIndex + 1];
    let progress = 0;

    const animate = () => {
      if (progress >= 1) {
        setCurrentStopIndex((prev) => prev + 1);
        if (currentStopIndex < busRoute.stops.length - 2) {
          setTimeout(() => moveToNextStop(), 2000);
        }
        return;
      }

      progress += 0.005;
      const newPosition = calculateNextPosition(
        currentStop.coordinates,
        nextStop.coordinates,
        progress
      );

      if (busMarkerRef.current) {
        busMarkerRef.current.setLngLat(newPosition);
      }

      requestAnimationFrame(animate);
    };

    animate();
  };

  const handleZoomIn = () => {
    if (zoomLevel < maxZoom) {
      const newZoom = zoomLevel + 1;
      setZoomLevel(newZoom);
      map.current?.setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > minZoom) {
      const newZoom = zoomLevel - 1;
      setZoomLevel(newZoom);
      map.current?.setZoom(newZoom);
    }
  };

  const focusOnBus = () => {
    if (busMarkerRef.current) {
      const currentPosition = busMarkerRef.current.getLngLat();
      map.current?.flyTo({
        center: [currentPosition.lng, currentPosition.lat],
        zoom: 16,
        duration: 1000,
      });
      setZoomLevel(16);
    }
  };

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: busRoute.stops[0].coordinates,
        zoom: 13,
        pitch: 45,
        bearing: -17.6,
        antialias: true,
      });

      map.current.on("load", () => {
        // Add the route line
        const coordinates = busRoute.stops.map((stop) => stop.coordinates);
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#4169E1",
            "line-width": 3,
          },
        });

        // Add stop markers
        busRoute.stops.forEach((stop, index) => {
          const el = document.createElement("div");
          el.className = `stop-marker ${getStopStatus(
            currentStopIndex,
            index
          )}`;

          if (index === busRoute.stops.length - 1) {
            // Create destination marker
            const destEl = document.createElement("div");
            destEl.className = "destination-marker";

            const markerContent = document.createElement("div");
            markerContent.className = "destination-content";

            const label = document.createElement("div");
            label.className = "destination-label";
            label.textContent = stop.name;

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-location-dot";

            markerContent.appendChild(label);
            markerContent.appendChild(icon);
            destEl.appendChild(markerContent);

            new mapboxgl.Marker(destEl)
              .setLngLat(stop.coordinates)
              .addTo(map.current);
          } else {
            new mapboxgl.Marker(el)
              .setLngLat(stop.coordinates)
              .addTo(map.current);
          }
        });

        // Add bus marker
        const busEl = document.createElement("div");
        busEl.className = "bus-marker";

        const markerContent = document.createElement("div");
        markerContent.className = "marker-content";

        const routeNumber = document.createElement("div");
        routeNumber.className = "route-number";

        const statusDot = document.createElement("span");
        statusDot.className = "status-dot on-time";

        const routeText = document.createElement("span");
        routeText.textContent = routeId;

        routeNumber.appendChild(statusDot);
        routeNumber.appendChild(routeText);

        const busIcon = document.createElement("div");
        busIcon.className = "specific-route-live-tracking-bus-icon";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-bus";
        busIcon.appendChild(icon);

        markerContent.appendChild(routeNumber);
        markerContent.appendChild(busIcon);
        busEl.appendChild(markerContent);

        busMarkerRef.current = new mapboxgl.Marker(busEl)
          .setLngLat(busRoute.stops[0].coordinates)
          .addTo(map.current);

        setTimeout(() => {
          setIsMoving(true);
          moveToNextStop();
        }, 2000);
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="specific-route-container">
      <header className="specific-route-live-tracking-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="specific-route-live-tracking-back-icon"
          onClick={onBack}
        />
        <h2>Route {routeId} - Live</h2>
      </header>

      <div className="map-container" ref={mapContainer}>
        <div className="map-controls">
          <button onClick={handleZoomIn} className="map-control-button">
            <FontAwesomeIcon icon={faSearchPlus} />
          </button>
          <button onClick={handleZoomOut} className="map-control-button">
            <FontAwesomeIcon icon={faSearchMinus} />
          </button>
          <button onClick={focusOnBus} className="map-control-button focus-bus">
            <i className="fa-solid fa-bus"></i>
          </button>
        </div>
      </div>

      <div className={`stops-panel-container ${showStops ? "expanded" : ""}`}>
        <button
          className="view-stops-button"
          onClick={() => setShowStops(!showStops)}
        >
          <span>Stops</span>
          <FontAwesomeIcon icon={showStops ? faChevronUp : faChevronDown} />
        </button>

        <div className={`stops-list ${showStops ? "visible" : ""}`}>
          {busRoute.stops.map((stop, index) => (
            <div
              key={index}
              className={`stop-item ${getStopStatus(currentStopIndex, index)}`}
            >
              <div className="stop-marker-indicator" />
              <div className="stop-details">
                <h4>{stop.name}</h4>
                {index === currentStopIndex && stop.distance && (
                  <p className="next-stop-info">Next Stop In {stop.distance}</p>
                )}
                {stop.passengers && (
                  <p className="passengers-info">
                    Passenger Scheduled: {stop.passengers}
                  </p>
                )}
                <span className="stop-time">{stop.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificRouteLiveTracking;
