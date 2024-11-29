"use client"
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 41.8781, // Example latitude (Chicago)
  lng: -87.6298, // Example longitude (Chicago)
};

const markers = [
  { id: "Thomas", lat: 41.85, lng: -87.65 },
  { id: "Aron", lat: 41.87, lng: -87.63 },
  { id: "Peter", lat: 41.90, lng: -87.62 },
];

export default function DeliveryPage() {
  return (
    <div>
      <header style={{ backgroundColor: "#FFA500", padding: "10px", color: "white" }}>
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
      </header>
      <LoadScript googleMapsApiKey="AIzaSyCAP6OLe12rtoqbb76YYdg8DHZRhNuFMpM">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {markers.map((marker) => (
            <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
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
