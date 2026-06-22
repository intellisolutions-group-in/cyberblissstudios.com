"use client"

import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline({ showHeader = true }: { showHeader?: boolean }) {
  const data = [
    {
      title: "Discovery and Planning",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed font-geist">
            We begin every engagement with structured discovery workshops to understand your business goals, user needs, technical constraints, and success criteria before writing a single line of code.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Requirements gathering and stakeholder interviews
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Technical feasibility assessment
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Project roadmap and milestone planning
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Design and Development",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed font-geist">
            Our Agile teams deliver in two-week sprints with regular demos, ensuring you have visibility and input throughout the build process. UI/UX design and engineering proceed in parallel for efficiency.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              UI/UX prototyping and design approval
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Iterative development with sprint demos
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Code reviews and quality assurance
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Launch and Support",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed font-geist">
            We manage deployment, user acceptance testing, and knowledge transfer to ensure a smooth go-live. Post-launch maintenance and support packages keep your software secure and up to date.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Staging, UAT, and production deployment
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Documentation and team handover
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm font-geist">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Ongoing maintenance and feature enhancements
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="process" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        {showHeader && (
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-6">Our Development Process</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-geist">
              A proven, transparent methodology that delivers quality software on schedule with continuous client collaboration
            </p>
          </div>
        )}

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}
