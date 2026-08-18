'use client';

import AdminLayout from '@/components/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TestimonialTable from '@/components/admin/TestimonialTable';
import EnquiryTable from '@/components/admin/EnquiryTable';
import { Separator } from '@/components/ui/separator';

export default function AdminContentPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Separator />
        <Tabs defaultValue="testimonials" className="space-y-4">
          <TabsList>
            <TabsTrigger value="testimonials" data-testid="admin-content-testimonials-tab">Testimonials</TabsTrigger>
            <TabsTrigger value="enquiries" data-testid="admin-content-enquiries-tab">Enquiries</TabsTrigger>
          </TabsList>
          <TabsContent value="testimonials">
            <h2 className="text-2xl font-semibold mb-4">Manage Testimonials</h2>
            <TestimonialTable />
          </TabsContent>
          <TabsContent value="enquiries">
            <h2 className="text-2xl font-semibold mb-4">Manage Enquiries</h2>
            <EnquiryTable />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}