"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// get all product
export const GetAllProduct = async () => {
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
      .from("products")
      .select()
      .order("created_at", { ascending: false, nullsFirst: false });
    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// delete sing peoducr by id

export const DeleteProduct = async ({ id }) => {
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
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.log(error);
      return error;
    }
    revalidatePath("/product");
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// update single product
export const UpdateProduct = async ({ id, data }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    // First, get the authenticated user
    const { error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log("User Error:", userError);
      return userError;
    }

    // Then, get the session data
    const { error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.log("Session Error:", sessionError);
      return sessionError;
    }

    const { data: response, error: updateError } = await supabase
      .from("products")
      .update(data)
      .eq("id", id)
      .select("*");

    if (updateError) {
      console.log("Update Error:", updateError);
      return updateError;
    }

    revalidatePath("/product");
    return true;
  } catch (error) {
    console.log("Catch Error:", error);
    return error;
  }
};

// delete single product
