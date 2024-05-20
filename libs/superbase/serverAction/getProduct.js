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
    const { data, error } = await supabase.from("products").select();

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
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    // also delete image
    // await supabase.storage.from("product-images").remove(filePath);

    if (error) {
      console.log(error);
      return error;
    }

    console.log(error);
    // revalidate the product path
    revalidatePath("/product");
    return true;
  } catch (error) {
    console.log(error);
  }
};
// update single product

export const UpdateProduct = async ({ product }) => {
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
      .update({ product })
      .eq("id", product.id);

    if (error) {
      return error;
    }
    return NextResponse.redirect("/product");
  } catch (error) {
    console.log(error);
  }
};
