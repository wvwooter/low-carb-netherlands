"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { brandPinIcon } from "./leaflet-icon";

export function ProfessionalMapInner({
  latitude,
  longitude,
  naam,
  locatie,
  provincie,
}: {
  latitude: number;
  longitude: number;
  naam: string;
  locatie: string;
  provincie: string;
}) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label={`Kaart met locatie van ${naam}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={brandPinIcon}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold text-forest-900">{naam}</p>
            <p className="text-ink-600">
              {locatie}, {provincie}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
