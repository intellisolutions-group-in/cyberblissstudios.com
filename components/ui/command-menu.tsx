"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  FileText,
  Briefcase,
  BookOpen,
  Mail,
  FileQuestion,
  Search,
  User,
  HelpCircle,
  FileCode,
  ArrowRight,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { services } from "@/lib/services"
import blogPosts from "@/data/blog.json"
import portfolio from "@/data/portfolio.json"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    
    // Listen for custom trigger events (e.g. from the Navbar search button)
    const handleToggle = () => {
      setOpen((open) => !open)
    }
    
    window.addEventListener("toggle-command-menu", handleToggle)

    return () => {
      document.removeEventListener("keydown", down)
      window.removeEventListener("toggle-command-menu", handleToggle)
    }
  }, [])

  const runCommand = (action: () => void) => {
    setOpen(false)
    action()
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen} className="bg-black/95 border border-red-500/20 text-white shadow-2xl shadow-red-500/10">
      <CommandInput placeholder="Type a command or search..." className="text-white placeholder:text-gray-500" />
      <CommandList className="scrollbar-none border-t border-red-500/10 bg-black/90">
        <CommandEmpty className="py-6 text-center text-sm text-gray-500 font-orbitron">No results found.</CommandEmpty>
        
        {/* Pages / Navigation Group */}
        <CommandGroup heading="Navigation" className="text-red-500 font-orbitron text-xs">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/about/"))}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
          >
            <User className="h-4 w-4 text-gray-500 shrink-0" />
            <span>About Us</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/services/"))}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
          >
            <FileCode className="h-4 w-4 text-gray-500 shrink-0" />
            <span>Services Catalog</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/portfolio/"))}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
          >
            <Briefcase className="h-4 w-4 text-gray-500 shrink-0" />
            <span>Portfolio & Case Studies</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/blog/"))}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
          >
            <BookOpen className="h-4 w-4 text-gray-500 shrink-0" />
            <span>Blog & Insights</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/faq/"))}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
          >
            <HelpCircle className="h-4 w-4 text-gray-500 shrink-0" />
            <span>Frequently Asked Questions</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator className="bg-red-500/10" />

        {/* Services Group */}
        <CommandGroup heading="Services" className="text-red-500 font-orbitron text-xs">
          {services.map((service) => (
            <CommandItem
              key={service.slug}
              onSelect={() => runCommand(() => router.push(`/services/${service.slug}/`))}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
            >
              <FileCode className="h-4 w-4 text-gray-500 shrink-0" />
              <div className="flex flex-col">
                <span>{service.title}</span>
                <span className="text-[10px] text-gray-500 line-clamp-1">{service.shortDescription}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-red-500/10" />

        {/* Portfolio / Projects Group */}
        <CommandGroup heading="Case Studies" className="text-red-500 font-orbitron text-xs">
          {portfolio.map((project) => (
            <CommandItem
              key={project.id}
              onSelect={() => runCommand(() => router.push(`/portfolio/#${project.id}`))}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
            >
              <Briefcase className="h-4 w-4 text-gray-500 shrink-0" />
              <div className="flex flex-col">
                <span>{project.title}</span>
                <span className="text-[10px] text-gray-500 line-clamp-1">{project.challenge}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-red-500/10" />

        {/* Blog Posts Group */}
        <CommandGroup heading="Blog Articles" className="text-red-500 font-orbitron text-xs">
          {blogPosts.map((post) => (
            <CommandItem
              key={post.slug}
              onSelect={() => runCommand(() => router.push(`/blog/${post.slug}/`))}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
            >
              <FileText className="h-4 w-4 text-gray-500 shrink-0" />
              <div className="flex flex-col">
                <span>{post.title}</span>
                <span className="text-[10px] text-gray-500 line-clamp-1">{post.excerpt}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="bg-red-500/10" />

        {/* Instant Actions Group */}
        <CommandGroup heading="Actions" className="text-red-500 font-orbitron text-xs">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/contact/"))}
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-red-500/10 data-[selected=true]:bg-red-500/10 data-[selected=true]:text-red-400 font-geist text-gray-300"
          >
            <Mail className="h-4 w-4 text-gray-500 shrink-0" />
            <span>Send Email / Request Proposal</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
