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
import Image from "next/image";
import Link from "next/link";
import { LoaderIcon } from "lucide-react";
import { useLoginAuth } from "@/hook/AuthHook";

export default function AuthenticationPage() {
  const { email, setEmail, password, setPassword, loading, login } =
    useLoginAuth();

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
                {loading && <LoaderIcon className="animate-spin" />}
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
