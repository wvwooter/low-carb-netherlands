import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { MOCK_EVENTS } from "@/lib/mock-data/events";
import { getVisibleProfessionals } from "@/lib/professionals";
import { getPublishedArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/over-ons",
    "/professionals",
    "/artikelen",
    "/boeken",
    "/recepten",
    "/bronnen",
    "/hulpmiddelen",
    "/podcasts",
    "/evenementen",
    "/videos",
    "/doneer",
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

  const visibleProfessionals = await getVisibleProfessionals();
  const professionalRoutes = visibleProfessionals.map((p) => ({
    url: `${SITE_URL}/professionals/${p.slug}`,
    lastModified: new Date(),
  }));

  const publishedArticles = await getPublishedArticles();
  const articleRoutes = publishedArticles.map((a) => ({
    url: `${SITE_URL}/artikelen/${a.slug}`,
    lastModified: new Date(a.publicatiedatum),
  }));

  const eventRoutes = MOCK_EVENTS.map((e) => ({
    url: `${SITE_URL}/evenementen/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...professionalRoutes, ...articleRoutes, ...eventRoutes];
}
