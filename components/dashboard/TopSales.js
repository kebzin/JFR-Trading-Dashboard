import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Train } from "lucide-react";

const TopSales = async () => {
  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Top product</CardTitle>
        <Train className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Oil</div>
        <p className="text-xs text-muted-foreground">Product that sale best</p>
      </CardContent>
    </Card>
  );
};

export default TopSales;
