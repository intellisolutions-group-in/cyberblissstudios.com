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
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "3334x951",
        type: "image/png",
      },
    ],
  }
}
