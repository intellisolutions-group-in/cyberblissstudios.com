import company from "@/data/company.json"
import { getAllServiceSlugs } from "@/lib/services"

/** Full years since company establishment (domain-age aligned). */
export function getYearsSinceEstablishment(): number {
  return new Date().getFullYear() - company.establishedYear
}

/** Current count of published service offerings. */
export function getServiceCount(): number {
  return getAllServiceSlugs().length
}

/** Conservative project count: one delivered project per year of operation. */
export function getProjectsDelivered(): number {
  return getYearsSinceEstablishment()
}
