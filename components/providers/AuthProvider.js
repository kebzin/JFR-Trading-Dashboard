// authentication
"use client";
import { createContext, useEffect, useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  //   async function signOut() {

  const supabase = createClientComponentClient();

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
        return;
      }
      setSession(null);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getSessionData() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.log(error);
          // Handle the error appropriately (e.g., show an error message to the user)
          return;
        }
        setSession(data.session);
      } catch (error) {
        console.log(error);
      }
    }
    getSessionData();
  });

  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
