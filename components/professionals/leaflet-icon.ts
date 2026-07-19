import L from "leaflet";

// We gebruiken een eigen SVG-pin (in de huisstijl) in plaats van Leaflet's
// standaard marker-afbeeldingen. Dat voorkomt het bekende Next.js/webpack-
// probleem met kapotte marker-icoon-paden, en sluit visueel beter aan bij
// de rest van de site (bosgroen + amber, zie Logo.tsx / opengraph-image.tsx).
export const brandPinIcon = L.divIcon({
  className: "",
  html: `
    <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0Z" fill="#193026" />
      <circle cx="15" cy="15" r="6.5" fill="#e6a838" />
    </svg>
  `,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -36],
});
