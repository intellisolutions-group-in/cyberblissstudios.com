"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Laptop,
  Server,
  Smartphone,
  Database,
  Cpu,
  Check,
  ExternalLink,
  Briefcase,
  Layers,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionReveal } from "@/components/premium/section-reveal"

// Types
interface TechItem {
  name: string
  description: string
  strengths: string[]
  caseStudies: { title: string; id: string }[]
}

interface TechCategory {
  id: string
  title: string
  icon: React.ComponentType<any>
  items: TechItem[]
}

// Tech Stack Database
const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend & UI",
    icon: Laptop,
    items: [
      {
        name: "Next.js",
        description: "Our core framework for building server-rendered, statically optimized, and highly secure web architectures.",
        strengths: ["Out-of-the-box SEO optimization", "Incremental Static Regeneration (ISR)", "Strict Core Web Vitals compliance"],
        caseStudies: [{ title: "Multi-Vendor E-commerce Marketplace", id: "ecommerce-marketplace" }],
      },
      {
        name: "React",
        description: "A component-driven client library that enables rapid state rendering and high-performance interactive interfaces.",
        strengths: ["Modular component architecture", "Rich and mature package ecosystem", "Optimized state rendering flows"],
        caseStudies: [
          { title: "Inventory Management System", id: "inventory-management-system" },
          { title: "Learning Management Portal", id: "learning-management-portal" },
          { title: "Business Analytics Dashboard", id: "analytics-dashboard" },
        ],
      },
      {
        name: "TypeScript",
        description: "Provides compile-time type safety, preventing code regressions and structuring models in large applications.",
        strengths: ["Strict compiler safety layers", "Self-documenting backend contracts", "Substantial developer velocity gains"],
        caseStudies: [
          { title: "Inventory Management System", id: "inventory-management-system" },
          { title: "Multi-Vendor E-commerce Marketplace", id: "ecommerce-marketplace" },
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Server,
    items: [
      {
        name: "Node.js",
        description: "An event-driven runtime used to engineer fast, non-blocking REST APIs and lightweight microservices.",
        strengths: ["Highly efficient asynchronous I/O", "Unified full-stack language profiles", "Scalable package manager modules"],
        caseStudies: [
          { title: "Inventory Management System", id: "inventory-management-system" },
          { title: "Patient Appointment Platform", id: "patient-appointment-app" },
        ],
      },
      {
        name: ".NET Core / C#",
        description: "Our enterprise backend system of choice, offering high security, speed, and strict type handling.",
        strengths: ["Excellent database mappings (EF Core)", "Strong cross-platform microservice design", "Robust cryptography capabilities"],
        caseStudies: [
          { title: "POS Integration System", id: "pos-integration-system" },
          { title: "Field Service Management App", id: "field-service-app" },
        ],
      },
      {
        name: "Python",
        description: "Leveraged for cloud automation scripts, mathematical calculations, and parsing analytics.",
        strengths: ["Highly readable script format", "Leading data and math libraries", "Fast proof-of-concept assembly"],
        caseStudies: [
          { title: "Learning Management Portal", id: "learning-management-portal" },
          { title: "Business Analytics Dashboard", id: "analytics-dashboard" },
        ],
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    icon: Smartphone,
    items: [
      {
        name: "React Native",
        description: "Cross-platform mobile framework compiling to native iOS and Android modules from a shared codebase.",
        strengths: ["Fast updates over-the-air", "Shared web-to-mobile logic models", "Excellent community module access"],
        caseStudies: [{ title: "Patient Appointment Platform", id: "patient-appointment-app" }],
      },
      {
        name: "Flutter",
        description: "Google's UI software kit, rendering pixel-perfect interfaces with high graphics performance.",
        strengths: ["Fully customized hardware rendering", "Compiled machine-code execution speeds", "Sleek material and cupertino widgets"],
        caseStudies: [{ title: "Field Service Management App", id: "field-service-app" }],
      },
    ],
  },
  {
    id: "database",
    title: "Database Systems",
    icon: Database,
    items: [
      {
        name: "PostgreSQL",
        description: "Our primary relational database choice for projects requiring strict data integrity and complex joins.",
        strengths: ["Full ACID transaction compliance", "Flexible JSONB query storage", "Highly indexable relational queries"],
        caseStudies: [
          { title: "Inventory Management System", id: "inventory-management-system" },
          { title: "Multi-Vendor E-commerce Marketplace", id: "ecommerce-marketplace" },
          { title: "Learning Management Portal", id: "learning-management-portal" },
          { title: "Business Analytics Dashboard", id: "analytics-dashboard" },
        ],
      },
      {
        name: "MongoDB",
        description: "A flexible document database suitable for dynamic metadata handling and rapid data changes.",
        strengths: ["Dynamic schema scalability", "High JSON document write rates", "Horizontal partition structures"],
        caseStudies: [{ title: "Patient Appointment Platform", id: "patient-appointment-app" }],
      },
    ],
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    icon: Cpu,
    items: [
      {
        name: "Cloud Hosting",
        description: "AWS, GCP, and Azure configurations mapped to support high availability, CDNs, and data backups.",
        strengths: ["99.99% system availability SLA", "Global static content distribution", "Robust automatic failovers"],
        caseStudies: [
          { title: "Inventory Management System", id: "inventory-management-system" },
          { title: "Multi-Vendor E-commerce Marketplace", id: "ecommerce-marketplace" },
          { title: "Document Workflow Automation", id: "document-workflow-automation" },
        ],
      },
      {
        name: "Docker & CI/CD",
        description: "Container virtualization and pipelines executing automated test runs before deploying code safely.",
        strengths: ["Identical local/staging/live testing", "Automated code quality compliance checks", "Zero-downtime rolling update cycles"],
        caseStudies: [{ title: "Multi-Vendor E-commerce Marketplace", id: "ecommerce-marketplace" }],
      },
    ],
  },
]

export function TechnologySection() {
  const [activeCategoryId, setActiveCategoryId] = useState("frontend")
  const [selectedTechName, setSelectedTechName] = useState("Next.js")

  // Find active data structures
  const activeCategory = TECH_CATEGORIES.find((cat) => cat.id === activeCategoryId) || TECH_CATEGORIES[0]
  
  const selectedTech = activeCategory.items.find((item) => item.name === selectedTechName) 
    || TECH_CATEGORIES.flatMap(c => c.items).find(i => i.name === selectedTechName)
    || activeCategory.items[0]

  const handleCategoryChange = (catId: string) => {
    setActiveCategoryId(catId)
    const targetCat = TECH_CATEGORIES.find((cat) => cat.id === catId)
    if (targetCat && targetCat.items.length > 0) {
      setSelectedTechName(targetCat.items[0].name)
    }
  }

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden border-t border-red-500/10">
      <div className="absolute inset-0 ambient-gradient pointer-events-none opacity-30" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.02]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionReveal
          title="Technology Radar"
          subtitle="We engineer solutions using modern, reliable technologies linked straight to our delivery case studies"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          
          {/* Left Column: Categories and Tech Selector (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Category Selectors */}
            <div className="glow-border bg-card/20 border border-red-500/10 p-5 rounded-lg backdrop-blur-md">
              <span className="text-[10px] uppercase font-orbitron tracking-wider text-red-500 block mb-3 font-semibold">
                Departments
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {TECH_CATEGORIES.map((cat) => {
                  const isActive = activeCategoryId === cat.id
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`flex items-center gap-3 text-left px-3 py-2 rounded font-orbitron text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-red-500/10 text-red-500 border border-red-500/30 font-semibold shadow-inner"
                          : "text-gray-400 border border-transparent hover:text-white hover:bg-red-500/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{cat.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Technology Buttons for Active Category */}
            <div className="glow-border bg-card/20 border border-red-500/10 p-5 rounded-lg backdrop-blur-md">
              <span className="text-[10px] uppercase font-orbitron tracking-wider text-red-500 block mb-3 font-semibold">
                Select Tool
              </span>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {activeCategory.items.map((tech) => {
                  const isSelected = selectedTechName === tech.name
                  return (
                    <button
                      key={tech.name}
                      onClick={() => setSelectedTechName(tech.name)}
                      className={`w-auto lg:w-full text-left px-4 py-2.5 rounded font-geist text-sm transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? "bg-red-500/15 border-red-500 text-white font-medium shadow-md shadow-red-500/5"
                          : "bg-black/30 border-red-500/5 text-gray-400 hover:border-red-500/20 hover:text-white hover:bg-red-500/5"
                      }`}
                    >
                      {tech.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Technology Details Panel (col-span-8) */}
          <div className="lg:col-span-8 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full"
              >
                <Card className="glow-border bg-card/20 border border-red-500/10 p-6 sm:p-8 rounded-lg backdrop-blur-md h-full glass-card">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-red-500/10 pb-4 flex-wrap gap-2">
                      <div>
                        <Badge variant="outline" className="border-red-500/30 text-red-400 font-orbitron text-[10px] tracking-wider mb-2">
                          {activeCategory.title}
                        </Badge>
                        <h3 className="text-2xl sm:text-3xl font-bold font-orbitron text-white leading-none">
                          {selectedTech.name}
                        </h3>
                      </div>
                      <Layers className="h-8 w-8 text-red-500/20 hidden sm:block" />
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-gray-300 font-geist text-sm sm:text-base leading-relaxed">
                        {selectedTech.description}
                      </p>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-orbitron font-semibold uppercase tracking-wider text-red-400">
                        Key Capabilities
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" aria-label="Key Capabilities">
                        {selectedTech.strengths.map((strength, index) => (
                          <li key={index} className="flex gap-2.5 items-start">
                            <div className="p-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mt-0.5 shrink-0">
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-xs sm:text-sm text-gray-400 font-geist leading-tight">
                              {strength}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Case Studies */}
                    {selectedTech.caseStudies && selectedTech.caseStudies.length > 0 && (
                      <div className="border-t border-red-500/10 pt-5 space-y-3">
                        <h4 className="text-xs font-orbitron font-semibold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span>Case Studies Implemented</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedTech.caseStudies.map((project) => (
                            <Link
                              key={project.id}
                              href={`/portfolio/#${project.id}`}
                              className="flex items-center justify-between p-3 rounded border border-red-500/5 hover:border-red-500/30 bg-black/40 hover:bg-red-500/5 text-gray-300 hover:text-white transition-all group cursor-pointer"
                            >
                              <span className="text-xs sm:text-sm font-geist font-medium line-clamp-1">{project.title}</span>
                              <ExternalLink className="h-3.5 w-3.5 text-gray-500 group-hover:text-red-500 transition-colors shrink-0 ml-2" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
