import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { MOCK_ARTICLES } from "@/lib/mock-data/articles";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { MOCK_PROFESSIONALS } from "@/lib/mock-data/professionals";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/over-ons",
    "/professionals",
    "/artikelen",
    "/evenementen",
    "/videos",
    "/aanmelden",
    "/contact",
    "/privacyverklaring",
    "/cookiebeleid",
    "/disclaimer",
    "/algemene-voorwaarden",
    "/medisch-voorbehoud",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const professionalRoutes = MOCK_PROFESSIONALS.filter(
    (p) => p.zichtbaar && p.goedkeuringsstatus === "approved"
  ).map((p) => ({
    url: `${SITE_URL}/professionals/${p.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = MOCK_ARTICLES.map((a) => ({
    url: `${SITE_URL}/artikelen/${a.slug}`,
    lastModified: new Date(a.publicatiedatum),
  }));

  const eventRoutes = MOCK_EVENTS.map((e) => ({
    url: `${SITE_URL}/evenementen/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...professionalRoutes, ...articleRoutes, ...eventRoutes];
}
