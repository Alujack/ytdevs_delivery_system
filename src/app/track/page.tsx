"use client"
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "680px",
};

const center = {
  lat: 11.5564, 
  lng: 104.9282, 
};


const markers = [
  { id: "Yan", lat: 11.5564, lng: 104.8282 },
  { id: "Jonh wick", lat: 11.5564, lng: 104.7282 },
  { id: "Alujack", lat: 11.5464, lng: 104.9282},
];

export default function DeliveryPage() {
  return (
    <div className="h-screen">
      <div className="flex flex-col md:flex-row">
        <div style={{ backgroundColor: "#fffff", padding: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/YTDEvs_icon.png"
              alt="Logo"
              style={{ height: "50px", marginRight: "10px" }}
            />
            <div>
              <p>Name: Jame Rogino</p>
              <p>ID: 000001</p>
              <p>Call: 0 123 456 789</p>
              <p>Time: 1h:30mn</p>
            </div>
          </div>
        </div>
        <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPAPI as string}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
            {markers.map((marker) => (
              <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
            ))}
          </GoogleMap>
        </LoadScript>

      </div>
      <button
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#FFA500",
          border: "none",
          color: "white",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Report
      </button>
    </div>
  );
}
