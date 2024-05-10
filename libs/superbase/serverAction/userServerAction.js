"use server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// get the user number of user from the database

export const CountActiveUSers = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const { data: users, error } = await supabase.from("users").select("*");

    if (error) {
      return error;
    }
    return users.length;
  } catch (error) {
    return error;
  }
};

// get all the user from the superbase store

export const GetAllUsers = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    return error;
  }
};

// update user profile

export const UpdateUser = async ({ id, data }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const { error } = await supabase.from("users").update(data).eq("id", id);

    if (error) {
      return error;
    }
    revalidatePath("/user");
    return true;
  } catch (error) {
    return error;
  }
};

// add new user

export const AddNewUser = async ({ data }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data: user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.log(error);
      return { errorCode: error.code, errorMessage: error.message };
    }
    // add additional data
    const id = user.user.id;
    const { error: userEror } = await supabase
      .from("users")
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone,
        user_role: data.user_role,
      })
      .eq("id", id);
    console.log(error);

    revalidatePath("/user");
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// delete user

export const DeleteUser = async ({ id }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
      return { errorCode: error.code, errorMessage: error.message };
    }
    revalidatePath("/user");
    return true;
  } catch (error) {
    return error;
  }
};

// suspend user

export const SuspendUser = async ({ id, data }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const { error } = await supabase.from("users").update(data).eq("id", id);
    if (error) {
      return { errorCode: error.code, errorMessage: error.message };
    }
    revalidatePath("/user");
    return true;
  } catch (error) {
    return error;
  }
};
