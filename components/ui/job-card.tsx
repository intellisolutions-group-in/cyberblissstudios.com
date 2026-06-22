"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase } from "lucide-react"
import { CareerForm } from "@/components/ui/career-form"
import { SlideUp } from "@/components/ui/slide-up"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
}

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <SlideUp index={index} hover>
        <Card className="glow-border bg-card/50 border-red-500/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <CardTitle className="text-white font-orbitron text-xl">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-3 mt-3">
                <Badge variant="outline" className="border-red-500/30 text-red-400 font-geist">
                  <Briefcase className="mr-1 h-3 w-3" />
                  {job.department}
                </Badge>
                <Badge variant="outline" className="border-red-500/30 text-gray-300 font-geist">
                  <MapPin className="mr-1 h-3 w-3" />
                  {job.location}
                </Badge>
                <Badge variant="outline" className="border-red-500/30 text-gray-300 font-geist">
                  {job.type}
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-geist border-0 shrink-0"
            >
              Apply
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 font-geist mb-4 leading-relaxed">{job.description}</p>
          <h4 className="text-white font-orbitron text-sm font-semibold mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-gray-400 font-geist space-y-1">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </CardContent>
        </Card>
      </SlideUp>

      <CareerForm isOpen={showForm} onClose={() => setShowForm(false)} jobTitle={job.title} />
    </>
  )
}
