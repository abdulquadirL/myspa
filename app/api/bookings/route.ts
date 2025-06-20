import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions.";


// POST /api/bookings - Create a new booking
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const { name, email, service, date, phone } = data;

  if (!name || !email || !service || !date) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([
      {
        name,
        email,
        service,
        date,
        phone,
        user_id: session.user?.email ?? null,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(booking, { status: 201 });
}

// GET /api/bookings - Get bookings with optional filters
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const serviceFilter = url.searchParams.get("service");
  const statusFilter = url.searchParams.get("status");

  let query = supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: false });

  if (serviceFilter) {
    query = query.eq("service", serviceFilter);
  }

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
