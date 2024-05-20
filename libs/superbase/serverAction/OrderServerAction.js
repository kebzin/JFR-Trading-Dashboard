"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function GetLatestFiveRecentOrder({ limit, start, end }) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  // First, get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.log(userError);
    return userError;
  }

  // Then, get the session data
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError);
    return sessionError;
  }
  try {
    const { data, error } = await supabase
      .from("order")
      .select(
        `
        *,
        deliver_by:users!public_order_deliver_by_fkey(id, first_name, last_name, phone_number),
        user:users!public_order_user_id_fkey(id, first_name, last_name, phone_number)
      `
      )
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

// this function get all the order base on compleation and add the product price then return the total price

export async function CalculateOrderTotalPrice() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    // First, get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError);
      return userError;
    }

    // Then, get the session data
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError);
      return sessionError;
    }
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

// Function to get all the driver who are active

export async function GetActiveDriver() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    // First, get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError);
      return userError;
    }

    // Then, get the session data
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError);
      return sessionError;
    }
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_role", "driver");

    if (error) {
      console.log(error);
      return error;
    }
    return data;
  } catch (error) {
    return error;
  }
}

// function to edit order base on order it

export const EditOrder = async ({ id, data }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    // First, get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError);
      return userError;
    }

    // Then, get the session data
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.log(sessionError);
      return sessionError;
    }
    const { error } = await supabase.from("order").update(data).eq("id", id);

    if (error) {
      console.log(error);
      return error;
    }
    revalidatePath("/orders");
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// implementing order delete

export const DeleteOrder = async ({ id }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    // First, get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      console.log(userError);
      return userError;
    }
    // Then, get the session data
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError) {
      console.log(sessionError);
      return sessionError;
    }
    const { error } = await supabase.from("order").delete().eq("id", id);
    if (error) {
      console.log(error);
      return error;
    }
    revalidatePath("/orders");
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
