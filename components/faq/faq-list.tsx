"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SlideUp } from "@/components/ui/slide-up"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  items: FAQItem[]
}

interface FAQListProps {
  faqData: FAQCategory[]
}

export function FAQList({ faqData }: FAQListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  // Calculate totals for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    let total = 0
    faqData.forEach((cat) => {
      counts[cat.id] = cat.items.length
      total += cat.items.length
    })
    counts["All"] = total
    return counts
  }, [faqData])

  // Filter FAQ items based on active category and search query
  const filteredData = useMemo(() => {
    return faqData
      .map((cat) => {
        // If category filter is active, only match items in that category
        const isCorrectCategory = activeCategory === "All" || cat.id === activeCategory
        if (!isCorrectCategory) {
          return { ...cat, items: [] }
        }

        const matchingItems = cat.items.filter((item) => {
          const matchesSearch =
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          return matchesSearch
        })

        return {
          ...cat,
          items: matchingItems,
        }
      })
      .filter((cat) => cat.items.length > 0)
  }, [faqData, searchQuery, activeCategory])

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
  }

  const handleReset = () => {
    setSearchQuery("")
    setActiveCategory("All")
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Sticky Category Sidebar (Desktop Only) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-4">
          <div className="glow-border bg-card/20 border border-red-500/10 p-6 rounded-lg backdrop-blur-md">
            <h2 className="font-orbitron text-white text-lg font-bold mb-4 tracking-wider uppercase border-b border-red-500/10 pb-3">
              FAQ Categories
            </h2>
            <nav className="space-y-1.5" aria-label="FAQ Categories">
              {/* "All Questions" option */}
              <button
                onClick={() => handleCategoryChange("All")}
                className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded font-orbitron text-sm transition-all duration-200 ${
                  activeCategory === "All"
                    ? "bg-red-500/10 text-red-500 border border-red-500/30 font-semibold shadow-inner"
                    : "text-gray-400 border border-transparent hover:text-white hover:bg-red-500/5"
                }`}
              >
                <span>All Questions</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-geist ${
                  activeCategory === "All" ? "bg-red-500 text-white" : "bg-red-500/10 text-red-400"
                }`}>
                  {categoryCounts["All"]}
                </span>
              </button>

              {/* Individual category links */}
              {faqData.map((category) => {
                const isActive = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center justify-between text-left px-4 py-2.5 rounded font-orbitron text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-red-500/10 text-red-500 border border-red-500/30 font-semibold shadow-inner"
                        : "text-gray-400 border border-transparent hover:text-white hover:bg-red-500/5"
                    }`}
                  >
                    <span>{category.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-geist ${
                      isActive ? "bg-red-500 text-white" : "bg-red-500/10 text-red-400"
                    }`}>
                      {categoryCounts[category.id] || 0}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Horizontal Category Tabs (Visible on screens < lg) */}
        <div className="lg:hidden w-full flex overflow-x-auto gap-2 pb-4 border-b border-red-500/10 mb-2 scrollbar-none">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCategoryChange("All")}
            className={`font-orbitron text-xs tracking-wider shrink-0 transition-all duration-200 ${
              activeCategory === "All"
                ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20"
                : "border-red-500/20 text-gray-400 bg-black/30 hover:border-red-500/50 hover:text-white"
            }`}
          >
            All ({categoryCounts["All"]})
          </Button>
          {faqData.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => handleCategoryChange(category.id)}
                className={`font-orbitron text-xs tracking-wider shrink-0 transition-all duration-200 ${
                  isActive
                    ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20"
                    : "border-red-500/20 text-gray-400 bg-black/30 hover:border-red-500/50 hover:text-white"
                }`}
              >
                {category.title} ({categoryCounts[category.id] || 0})
              </Button>
            )
          })}
        </div>

        {/* Right Column - Search & Accordion Content */}
        <main className="w-full lg:col-span-8 space-y-6">
          {/* Search Input Box */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-11 bg-black/50 border-red-500/20 focus-visible:border-red-500/50 focus-visible:ring-red-500/20 text-white font-geist placeholder:text-gray-500 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Accordion List */}
          {filteredData.length > 0 ? (
            <div className="space-y-10">
              {filteredData.map((category, categoryIndex) => (
                <SlideUp key={category.id} delay={categoryIndex * 0.05}>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-red-500 font-orbitron border-l-2 border-red-500 pl-3">
                      {category.title}
                    </h3>
                    <Accordion type="single" collapsible className="w-full space-y-3">
                      {category.items.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.id}-${index}`}
                          className="border border-red-500/10 rounded bg-card/10 overflow-hidden transition-all duration-200 hover:border-red-500/20 hover:bg-card/20"
                        >
                          <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-white hover:text-red-400 font-orbitron px-5 py-3.5 hover:no-underline [&[data-state=open]]:text-red-400 transition-colors">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300 leading-relaxed px-5 pb-4 font-geist border-t border-red-500/5 pt-3">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </SlideUp>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card/10 rounded-lg border border-dashed border-red-500/20">
              <p className="font-orbitron text-gray-400 text-lg mb-4">No answers found</p>
              <p className="font-geist text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                We couldn't find any FAQs matching "{searchQuery}" under the selected category.
              </p>
              <Button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white font-orbitron text-xs tracking-wider"
              >
                Reset Search and Filters
              </Button>
            </div>
          )}
        </main>
        
      </div>
    </div>
  )
}
