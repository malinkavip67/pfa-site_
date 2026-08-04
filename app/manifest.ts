import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Премьер Футбольное Агентство",
    short_name: "PFA",
    description: "Международное футбольное агентство и профессиональное сопровождение карьеры футболистов.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050B14",
    theme_color: "#050B14",
    orientation: "any",
    lang: "ru",
    categories: ["sports", "business"],
    icons: [
      {
        src: "/icons/pwa-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/pwa-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
