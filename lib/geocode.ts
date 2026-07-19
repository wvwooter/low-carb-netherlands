import "server-only";

/**
 * Geocodeert een adres via Nominatim (OpenStreetMap) — gratis, geen API-key
 * nodig. Gebruiksbeleid van Nominatim vereist een duidelijke User-Agent en
 * maximaal ~1 verzoek per seconde; dat is ruim voldoende voor het incidenteel
 * geocoderen van een nieuw goedgekeurde professional.
 */
export async function geocodeAddress(
  query: string
): Promise<{ latitude: number; longitude: number } | null> {
  if (!query.trim()) return null;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "nl");
    url.searchParams.set("q", query);

    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent": "LowCarbNetherlands/1.0 (contact@lowcarbnetherlands.nl)",
        "Accept-Language": "nl",
      },
      // Nominatim-resultaten voor een plaatsnaam veranderen niet; lang cachen.
      next: { revalidate: 60 * 60 * 24 * 30 },
    });

    if (!response.ok) return null;

    const results = (await response.json()) as { lat: string; lon: string }[];
    const first = results[0];
    if (!first) return null;

    const latitude = Number.parseFloat(first.lat);
    const longitude = Number.parseFloat(first.lon);
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

    return { latitude, longitude };
  } catch (error) {
    console.error("Geocoding mislukt:", error);
    return null;
  }
}
