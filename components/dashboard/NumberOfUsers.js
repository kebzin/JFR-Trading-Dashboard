import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Activity } from "lucide-react";
import { CountActiveUSers } from "@/libs/superbase/serverAction/userServerAction";

const NumberOfUsers = async () => {
  const data = await CountActiveUSers();
  return (
    <Card x-chunk="dashboard-01-chunk-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">All Active customers</p>
      </CardContent>
    </Card>
  );
};

export default NumberOfUsers;
