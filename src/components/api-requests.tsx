'use client';

import EverythingRequest from '@/components/api-requests/everything';
import PatientRequest from '@/components/api-requests/patient';
import EobRequest from '@/components/api-requests/eob';
import CoverageRequest from '@/components/api-requests/coverage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const handleCopyJson = (data: unknown) => {
  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
};

export function ApiRequests() {
  return (
    <Tabs defaultValue="everything" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-100/80 p-1 rounded-xl">
        <TabsTrigger value="everything" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          $everything
        </TabsTrigger>
        <TabsTrigger value="patient" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Patient
        </TabsTrigger>
        <TabsTrigger value="eob" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          EOB
        </TabsTrigger>
        <TabsTrigger value="coverage" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Coverage
        </TabsTrigger>
      </TabsList>
      <TabsContent value="everything" className="mt-0">
        <EverythingRequest />
      </TabsContent>
      <TabsContent value="patient" className="mt-0">
        <PatientRequest />
      </TabsContent>
      <TabsContent value="eob" className="mt-0">
        <EobRequest />
      </TabsContent>
      <TabsContent value="coverage" className="mt-0">
        <CoverageRequest />
      </TabsContent>
    </Tabs>
  );
}
