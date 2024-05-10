"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SupabaseClient } from "@supabase/supabase-js";
import { CheckCircle, FileTerminal, LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// export const metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// };

export default function AuthenticationPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();

  // login function
  const login = async () => {
    setLoading(true);
    toast("Login in process", {
      description: "Sigining you to your account",
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
          icon: <FileTerminal className=" text-destructive" />,
        });
        setLoading(false);
        return;
      }
      toast("Login in complete", {
        description: "sigining complete",
        icon: <CheckCircle className=" text-primary" />,
      });
      setLoading(false);
    } catch (error) {
      toast("Login Error", {
        description: error.message,
        icon: <FileTerminal className=" text-destructive" />,
      });
      setLoading(false);

      // redirect the user back to where thy are comming from
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(event) => setEmail(event.target.value)}
                  id="email"
                  type="email"
                  placeholder="someone@gmail.com"
                  required
                  value={email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <Button
                disabled={loading}
                onClick={login}
                type="submit"
                className="w-full flex items-center gap-3"
              >
                {loading && <LoaderIcon className="animate-spin " />}
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="#" className="underline"></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}