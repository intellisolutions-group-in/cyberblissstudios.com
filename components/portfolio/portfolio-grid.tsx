"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SlideUp } from "@/components/ui/slide-up"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Project {
  id: string
  title: string
  type: string
  challenge: string
  solution: string
  technologies: string[]
  outcome: string
}

interface PortfolioGridProps {
  projects: Project[]
}

const ITEMS_PER_PAGE = 4

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  // Get unique project types dynamically
  const projectTypes = useMemo(() => {
    const types = new Set(projects.map((p) => p.type))
    return ["All", ...Array.from(types)]
  }, [projects])

  // Filter projects based on search query and project type
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType =
        selectedType === "All" || project.type === selectedType

      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.challenge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.outcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesType && matchesSearch
    })
  }, [projects, searchQuery, selectedType])

  // Reset page when search or type changes
  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedType("All")
    setCurrentPage(1)
  }

  // Paginated items
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE)
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProjects, currentPage])

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 bg-card/20 p-6 rounded-lg border border-red-500/10 glow-border">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search projects by title, tech stack, challenge..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 pr-9 h-10 bg-black/50 border-red-500/20 focus-visible:border-red-500/50 focus-visible:ring-red-500/20 text-white font-geist placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Reset Filters Quick Button */}
          {(searchQuery || selectedType !== "All") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 font-orbitron text-xs tracking-wider"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Project Type Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-red-500/5">
          {projectTypes.map((type) => {
            const isActive = selectedType === type
            return (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => handleTypeChange(type)}
                className={`font-orbitron text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20 hover:bg-red-600 hover:text-white"
                    : "border-red-500/20 text-gray-400 bg-black/30 hover:border-red-500/50 hover:text-white"
                }`}
              >
                {type}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Grid Content */}
      {paginatedProjects.length > 0 ? (
        <div className="space-y-12">
          {paginatedProjects.map((project, index) => (
            <SlideUp key={project.id} index={index} hover>
              <Card className="glow-border bg-card/30 border-red-500/20 h-full">
                <CardHeader>
                  <Badge variant="outline" className="w-fit border-red-500/30 text-red-400 font-geist mb-2">
                    {project.type}
                  </Badge>
                  <CardTitle className="text-white font-orbitron text-2xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Challenge</h3>
                    <p className="text-gray-300 font-geist leading-relaxed">{project.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Solution</h3>
                    <p className="text-gray-300 font-geist leading-relaxed">{project.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-geist">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-red-400 font-orbitron text-sm font-semibold mb-2">Outcome</h3>
                    <p className="text-gray-300 font-geist leading-relaxed">{project.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            </SlideUp>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card/10 rounded-lg border border-dashed border-red-500/20">
          <p className="font-orbitron text-gray-400 text-lg mb-4">No projects found</p>
          <p className="font-geist text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            We couldn't find any portfolio projects matching your search or filters.
          </p>
          <Button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-orbitron text-xs tracking-wider"
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-40"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-500/10 border-red-500/10"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageNum}
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNum)
                      }}
                      className={`h-9 w-9 flex items-center justify-center font-geist border transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
                          : "border-red-500/10 text-gray-400 bg-black/20 hover:bg-red-500/10 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-40"
                      : "text-gray-400 hover:text-red-500 hover:bg-red-500/10 border-red-500/10"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
