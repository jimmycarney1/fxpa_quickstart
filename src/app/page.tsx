'use client'

import { LaunchLink } from '@/components/launch-link'
import { Shield, Zap, Database } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-indigo-100 text-sm text-indigo-600 font-medium mb-8 shadow-sm">
            <Zap className="h-4 w-4" />
            Healthcare Data API
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Flexpa</span> Quickstart
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Connect to health insurance data in minutes. Launch Link to let users securely
            authorize access to their claims, coverage, and clinical records.
          </p>

          <LaunchLink />

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 backdrop-blur border border-gray-100 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-indigo-500" />
              HIPAA Compliant
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 backdrop-blur border border-gray-100 text-sm text-muted-foreground">
              <Database className="h-4 w-4 text-indigo-500" />
              FHIR R4 Standard
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 backdrop-blur border border-gray-100 text-sm text-muted-foreground">
              <Zap className="h-4 w-4 text-indigo-500" />
              Real-time Sync
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}