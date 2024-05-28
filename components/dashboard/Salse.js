import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreditCard } from "lucide-react";
import { CalculateOrderTotalPrice } from "@/libs/superbase/serverAction/OrderServerAction";

const Salse = async () => {
  // run the price calculating function in the server
  const result = await CalculateOrderTotalPrice();
  // console.log(result);

  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <CreditCard className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">GMD 12,234</div>
        <p className="text-xs text-muted-foreground">
          from last month up to data
        </p>
      </CardContent>
    </Card>
  );
};

export default Salse;
