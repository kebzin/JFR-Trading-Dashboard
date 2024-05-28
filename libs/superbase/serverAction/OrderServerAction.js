"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

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

export async function GetLatestFiveRecentOrder() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase.from("order").select("*").limit(5);

    if (error) {
      console.log(error);
      return error;
    }
    return data;
  } catch (error) {
    return error;
  }
}
