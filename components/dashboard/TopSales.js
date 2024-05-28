import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
      </CardContent>
    </Card>
  );
};

export default UnconfirmUSers;
