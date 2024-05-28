"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Get all notifications with pagination
export async function GetNotification({ limit = 5, start = 0 }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.log(userError);
    return userError;
  }

  // Get the session data
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    console.log(sessionError);
    return sessionError;
  }

  try {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, start + limit - 1);

    if (error) {
      console.log(error);
      return error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
