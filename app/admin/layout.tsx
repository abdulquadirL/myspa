
// app/admin/layout.tsx
import { ReactNode } from "react";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "@/app/globals.css";
import Greeting from "@/components/Dashboard/Greeting";
import LogoutButton from "@/components/Dashboard/LogoutButton";


export const metadata = {
  title: "Admin Dashboard - Nirvana De Spa",
  description: "Manage spa bookings and client data",
};

type AdminSessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions) as (Session & { user?: AdminSessionUser }) | null;

  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <Greeting name={session.user?.name || "Admin"} />
        <LogoutButton />
      </header>
      <main>{children}</main>
    </div>
  );
}
