"use client";
import { useContext } from "react";
import { AuthContext } from "@/components/providers/AuthProvider";

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Auth context is not available.");
  }

  // Perform input validation and sanitization for authContext if necessary

  return authContext;
}

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderIcon, CheckCircle, FileTerminal } from "lucide-react";
import { getSingleUser } from "@/libs/superbase/serverAction/userServerAction";

export const useLoginAuth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    toast("Login in process", {
      description: "Signing you into your account",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast(error.name, {
          description: error.message,
          icon: <FileTerminal className="text-destructive" />,
        });
        setLoading(false);
        return;
      }

      const checkForUSerRole = await getSingleUser(data.session.user.id);

      // only allow user whose user_role is admin. Otherwise log them out
      if (checkForUSerRole[0]?.user_role !== "admin") {
        toast("Login Error", {
          description: "You are not an admin",
          icon: <FileTerminal className="text-destructive" />,
        });
        setLoading(false);

        // sign them out
        await supabase.auth.signOut();

        return;
      }

      toast("Login complete", {
        description: "Signing complete",
        icon: <CheckCircle className="text-primary" />,
      });
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast("Login Error", {
        description: error.message,
        icon: <FileTerminal className="text-destructive" />,
      });
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    login,
  };
};
