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
      .from("users")
      .select("*")
      .neq("user_role", "customer")
      .order("created_at", { ascending: false, nullsFirst: false });
    // .eq("user_role", "admin");

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

// get the all the users whose account are not confirm
// get all unconfirmed users
export const GetUnconfirmedUsers = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
<<<<<<< HEAD
    const { data: unconfirmedUsers, error } = await supabase
      .from("users")
      .select("*")
      .eq("confirm", false);
=======
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
    const { data: unconfirmedUsers, error } = await supabase
      .from("users")
      .select("*")
      .eq("confirm", false)
      .order("created_at", { ascending: false, nullsFirst: false });
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
    if (error) {
      return error;
    }
    return unconfirmedUsers.length;
  } catch (error) {
    return error;
  }
};
<<<<<<< HEAD
=======

// get all user who are customers only

export const GetCustomers = async () => {
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
    const { data: customers, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_role", "customer")
      .order("created_at", { ascending: false, nullsFirst: false });
    if (error) {
      return error;
    }

    return customers;
  } catch (error) {
    return error;
  }
};

// function toupdate user confirm

export const UpdateUSerData = async ({ id, data, staff = false }) => {
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
    const { error } = await supabase.from("users").update(data).eq("id", id);

    if (error) {
      return { errorCode: error.code, errorMessage: error.message };
    }
    revalidatePath(`${staff === true ? "/staff" : "/customer"}`);
    return true;
  } catch (error) {
    return error;
  }
};

// get all the users base on the provided argument

export const GetUsers = async ({ user_role }) => {
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
    const { data: customers, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_role", user_role)
      .order("created_at", { ascending: false, nullsFirst: false });
    if (error) {
      return error;
    }

    return customers;
  } catch (error) {
    return error;
  }
};

// get single user

export const getSingleUser = async (id) => {
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
    const { data: customers, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);

    if (error) {
      return error;
    }
    return customers;
  } catch (error) {
    return error;
  }
};
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
