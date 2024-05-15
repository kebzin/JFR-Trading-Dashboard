"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// this function get all the order base on compleation and add the product price then return the total price

export async function CalculateOrderTotalPrice() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase
      .from("order")
      .select("*")
      .eq("status", "payment completed");

    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    return error;
  }
}

// get the latest five recent order

export async function GetLatestFiveRecentOrder({ limit, start, end }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase
      .from("order")
      .select(`*,users!public_order_user_id_fkey(*)`)
      .limit(limit)
      .order("created_at", { ascending: false, nullsFirst: false })
      .range(start, end);

    if (error) {
      console.log(error);
      return error;
    }
    return data;
  } catch (error) {
    return error;
  }
}
