import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ericchour.vercel.app/",
      lastModified: new Date(),
    },
  ];
}