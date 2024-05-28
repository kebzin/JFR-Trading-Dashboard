import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
<<<<<<< HEAD
import { Users } from "lucide-react";
import { GetUnconfirmedUsers } from "@/libs/superbase/serverAction/userServerAction";
GetUnconfirmedUsers;

const UnconfirmUSers = async () => {
  const result = await GetUnconfirmedUsers();

  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Users Onboard</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{result}</div>
        <p className="text-xs text-muted-foreground">Product that sale best</p>
=======
import { Train } from "lucide-react";
import { GetUnconfirmedUsers } from "@/libs/superbase/serverAction/userServerAction";

const UnConfirmUsers = async () => {
  const result = await GetUnconfirmedUsers();
  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User Onboard</CardTitle>
        <Train className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{result}</div>
        <p className="text-xs text-muted-foreground">Unconfirm user onboard </p>
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
      </CardContent>
    </Card>
  );
};

<<<<<<< HEAD
export default UnconfirmUSers;
=======
export default UnConfirmUsers;
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
