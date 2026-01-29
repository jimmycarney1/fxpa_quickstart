'use client'

import FlexpaLink from '@flexpa/link'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export function LaunchLink() {
  const router = useRouter();

  function open() {
    FlexpaLink.create({
      publishableKey: process.env.NEXT_PUBLIC_FLEXPA_PUBLISHABLE_KEY!,
      usage: 'ONE_TIME',
      user: { externalId: crypto.randomUUID() },
      onSuccess: async (publicToken: string) => {
        await fetch('/api/exchange', { method: 'POST', body: JSON.stringify({ publicToken }) })
        router.push('/dashboard');
      }
    })

    FlexpaLink.open();
  }

  return (
    <Button
      onClick={() => open()}
      size="lg"
      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
    >
      Connect Health Insurance
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  )
}   