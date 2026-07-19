"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { brandPinIcon } from "./leaflet-icon";

export interface MapPin {
  slug: string;
  naam: string;
  locatie: string;
  provincie: string;
  latitude: number;
  longitude: number;
}

// Nederland-centrum als startpunt; wordt daarna overschreven zodra we de
// pins kennen (fitBounds hieronder).
const NL_CENTER: [number, number] = [52.1326, 5.2913];

function FitBounds({ pins }: { pins: MapPin[] }) {
  const map = useMap();

  useEffect(() => {
    if (pins.length === 0) return;
    if (pins.length === 1) {
      map.setView([pins[0].latitude, pins[0].longitude], 12);
      return;
    }
    const bounds = pins.map((p) => [p.latitude, p.longitude] as [number, number]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
  }, [pins, map]);

  return null;
}

export function ProfessionalsMapInner({ pins }: { pins: MapPin[] }) {
  return (
    <MapContainer
      center={NL_CENTER}
      zoom={7}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label="Kaart met professionals"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds pins={pins} />
      {pins.map((p) => (
        <Marker key={p.slug} position={[p.latitude, p.longitude]} icon={brandPinIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-forest-900">{p.naam}</p>
              <p className="text-ink-600">
                {p.locatie}, {p.provincie}
              </p>
              <Link
                href={`/professionals/${p.slug}`}
                className="mt-1 inline-block font-medium text-forest-800 hover:underline"
              >
                Bekijk profiel →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
