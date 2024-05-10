import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DollarSign } from "lucide-react";
import { CalculateOrderTotalPrice } from "@/libs/superbase/serverAction/OrderServerAction";

const TotalRevenue = async () => {
  const result = await CalculateOrderTotalPrice();

  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">GMD 45,231.89</div>
        <p className="text-xs text-muted-foreground">Total revenue generated</p>
      </CardContent>
    </Card>
  );
};

export default TotalRevenue;
