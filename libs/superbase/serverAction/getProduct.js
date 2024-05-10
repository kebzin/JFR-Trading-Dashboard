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
    return data;
  } catch (error) {
    console.log(error);
  }
};
// update single product

export const UpdateProduct = async (req, res, next) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { id } = req.query;
  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      })
      .eq("id", id);

    if (error) {
      return error;
    }
    return NextResponse.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
