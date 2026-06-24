"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { BlogPost } from "@/lib/blog"
import { BlogCard } from "@/components/ui/blog-card"
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

interface BlogGridProps {
  posts: BlogPost[]
}

const ITEMS_PER_PAGE = 3

export function BlogGrid({ posts }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)

  // Get unique categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(posts.map((post) => post.category))
    return ["All", ...Array.from(cats)]
  }, [posts])

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [posts, searchQuery, selectedCategory])

  // Reset page when search or category changes
  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    setCurrentPage(1)
  }

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setCurrentPage(1)
  }

  // Paginated items
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredPosts, currentPage])

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/20 p-6 rounded-lg border border-red-500/10 glow-border">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search articles by title, tags, content..."
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

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((category) => {
            const isActive = selectedCategory === category
            return (
              <Button
                key={category}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`font-orbitron text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20 hover:bg-red-600 hover:text-white"
                    : "border-red-500/20 text-gray-400 bg-black/30 hover:border-red-500/50 hover:text-white"
                }`}
              >
                {category}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Grid Content */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-card/10 rounded-lg border border-dashed border-red-500/20">
          <p className="font-orbitron text-gray-400 text-lg mb-4">No articles found</p>
          <p className="font-geist text-gray-500 text-sm mb-6 max-w-sm mx-auto">
            We couldn't find any blog posts matching your search query or selected category.
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
