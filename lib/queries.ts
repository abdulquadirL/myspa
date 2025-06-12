import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type GetFilteredBookingsParams = {
  page: number;
  pageSize: number;
  filters?: {
    service?: string;
    date?: string;
  };
};

export async function getFilteredBookings({
  page,
  pageSize,
  filters,
}: GetFilteredBookingsParams) {
  const supabase = createServerComponentClient({ cookies });

  let query = supabase
    .from("bookings")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters?.service) {
    query = query.eq("service_type", filters.service);
  }

  if (filters?.date) {
    query = query.eq("date", filters.date);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: bookings, count, error } = await query.range(from, to);

  if (error) {
    console.error("Error fetching bookings:", error);
    return { bookings: [], totalCount: 0 };
  }

  return {
    bookings: bookings || [],
    totalCount: count || 0,
  };
}
