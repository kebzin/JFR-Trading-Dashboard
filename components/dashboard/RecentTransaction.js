import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { GetLatestFiveRecentOrder } from "@/libs/superbase/serverAction/OrderServerAction";
import {
  DetermingOrderStatus,
  convertToReadableDate,
  formatCurrency,
} from "@/lib/utils";

const RecentTransaction = async () => {
  const result = await GetLatestFiveRecentOrder({
    limit: 10,
    start: 1,
    end: 10,
  });
  // console.log(result);
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="#">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="">Type</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result?.map((item) => {
              return (
                <TableRow className="cursor-pointer" key={item?.id}>
                  <TableCell>
                    <div className="font-medium">
                      {item?.users?.first_name + " " + item?.users?.last_name}
                    </div>
                    <div className=" text-sm text-muted-foreground md:inline">
                      {item?.users?.phone_number}
                    </div>
                  </TableCell>
                  <TableCell className="">Sale</TableCell>
                  <TableCell className="">
                    <Badge className="text-xs" variant="outline">
                      {DetermingOrderStatus(item?.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className=" md:table-cell ">
                    {convertToReadableDate(item?.created_at)}
                    {/* {item?.created_at} */}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item?.Total)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
