// app/admin/dashboard/page.tsx
import { getFilteredBookings } from "@/lib/queries";
import BookingTable from "@/components/Dashboard/BookingTable";
import Filters from "@/components/Dashboard/Filters";
import Greeting from "@/components/Dashboard/Greeting";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - MySpa",
  description: "Admin dashboard for managing bookings and services.",
};

interface SearchParams {
  page?: string;
  service?: string;
  date?: string;
}

interface PageProps {
  searchParams?: SearchParams;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const userName = session.user.name || session.user.email;
  const page = Number(searchParams?.page || 1);
  const service = searchParams?.service || "";
  const date = searchParams?.date || "";

  const bookings = await getFilteredBookings({ page, service, date });

  return (
    <section className="space-y-6 max-w-6xl mx-auto px-4 py-8">
      <Greeting name={userName} />
      <Filters
        selectedService={service}
        selectedDate={date}
        search=""
        setSearch={() => {}}
        statusFilter=""
        setStatusFilter={() => {}}
        setServiceFilter={() => {}}
        dateFilter=""
        setDateFilter={() => {}}
        serviceFilter=""
        onExportCSV={() => {}}
        filters={{}}
        onChange={() => {}}
      />
      <BookingTable bookings={bookings} />
    </section>
  );
}
