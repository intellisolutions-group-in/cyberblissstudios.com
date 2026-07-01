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

const ITEMS_PER_PAGE = 6

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
                      className={`h-9 w-9 flex items-center justify-center font-geist border transition-all duration-200 ${currentPage === pageNum
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
