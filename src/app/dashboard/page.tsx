'use server'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session';
import { decodeJwt } from 'jose';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApiRequests } from '@/components/api-requests'
import { AccessTokenDisplay } from '@/components/access-token-display'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { CopyButton } from '@/components/copy-button'
import MedplumSync from '@/components/medplum-sync';

export default async function Dashboard() {
  const token = await decrypt((await cookies()).get('session')?.value);
  const decoded = decodeJwt(token?.accessToken as string);
  const isMedplumConfigured = process.env.MEDPLUM_CLIENT_ID && process.env.MEDPLUM_CLIENT_SECRET;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg">
        <div className="container flex h-16 max-w-screen-lg mx-auto items-center justify-between px-4">
          <Link className="flex items-center gap-2" href="/">
            <span className="font-bold text-lg gradient-text">Flexpa</span>
            <span className="text-muted-foreground font-medium">Quickstart</span>
          </Link>
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
            Connected
          </Badge>
        </div>
      </header>

      <main className="container max-w-screen-lg mx-auto py-8 px-4">
        <div className="grid gap-6">
          {/* Authorization Card */}
          <Card className="border-0 shadow-lg shadow-indigo-500/5 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Patient Authorization</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your access token from <Link href="https://www.flexpa.com/docs/consent" className="text-indigo-600 hover:underline">Flexpa Link</Link> consent flow
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                  <div className="text-sm font-medium text-muted-foreground">Authorization ID</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 relative rounded-lg bg-slate-50 border px-3 py-2 font-mono text-sm">
                      {decoded.sub as string}
                    </code>
                    <CopyButton value={decoded.sub as string} />
                  </div>

                  <div className="text-sm font-medium text-muted-foreground">Patient ID</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 relative rounded-lg bg-slate-50 border px-3 py-2 font-mono text-sm">
                      {decoded.patient as string}
                    </code>
                    <CopyButton value={decoded.patient as string} />
                  </div>

                  <div className="text-sm font-medium text-muted-foreground">Access Token</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative rounded-lg bg-slate-50 border px-3 py-2">
                      <AccessTokenDisplay token={token?.accessToken as string} />
                    </div>
                    <CopyButton value={token?.accessToken as string} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Explorer Card */}
          <Card className="border-0 shadow-lg shadow-indigo-500/5 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">FHIR API Explorer</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Explore patient data using <Link href="https://www.flexpa.com/docs/records" className="text-indigo-600 hover:underline">Flexpa&apos;s FHIR R4 API</Link>
                  </p>
                </div>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono text-muted-foreground">
                  api.flexpa.com/fhir
                </code>
              </div>
            </CardHeader>
            <CardContent>
              <ApiRequests />
            </CardContent>
          </Card>

          {/* Medplum Sync Card */}
          {isMedplumConfigured && (
            <Card className="border-0 shadow-lg shadow-indigo-500/5 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Medplum Integration</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sync to <Link href="https://flexpa.com/docs/guides/medplum" className="text-indigo-600 hover:underline">Medplum</Link> FHIR server
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <MedplumSync />
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
