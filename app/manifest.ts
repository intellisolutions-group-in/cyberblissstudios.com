import type { MetadataRoute } from "next"
import company from "@/data/company.json"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.brandName,
    short_name: "CyberBliss",
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ef4444",
    lang: "en-IN",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/images/logo.svg",
        sizes: "200x40",
        type: "image/svg+xml",
      },
    ],
  }
}
