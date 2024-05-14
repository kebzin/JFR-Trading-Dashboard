import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
      </CardContent>
    </Card>
  );
};

export default UnConfirmUsers;
