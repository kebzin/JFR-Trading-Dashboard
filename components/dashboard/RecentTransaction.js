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
<<<<<<< HEAD
  const result = await GetLatestFiveRecentOrder();
=======
  const result = await GetLatestFiveRecentOrder({
    limit: 10,
    start: 1,
    end: 10,
  });
  // console.log(result);
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
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
<<<<<<< HEAD
              <TableHead className=" ">Type</TableHead>
=======
              <TableHead className="">Type</TableHead>
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
              <TableHead className="">Status</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
<<<<<<< HEAD
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="">Sale</TableCell>
              <TableCell className="">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell ">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Olivia Smith</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  olivia@example.com
                </div>
              </TableCell>
              <TableCell className="">Refund</TableCell>
              <TableCell className="">
                <Badge className="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell ">
                2023-06-24
              </TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Noah Williams</div>
                <div className=" text-sm text-muted-foreground md:inline">
                  noah@example.com
                </div>
              </TableCell>
              <TableCell className="">Number of productw</TableCell>
              <TableCell className="">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className=" md:table-cell ">2023-06-25</TableCell>
              <TableCell className="text-right">$350.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Emma Brown</div>
                <div className=" text-sm text-muted-foreground md:inline">
                  emma@example.com
                </div>
              </TableCell>
              <TableCell className="">Sale</TableCell>
              <TableCell className="">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell ">
                2023-06-26
              </TableCell>
              <TableCell className="text-right">$450.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="">Sale</TableCell>
              <TableCell className="">
                <Badge className="text-xs" variant="outline">
                  Approved
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell ">
                2023-06-27
              </TableCell>
              <TableCell className="text-right">$550.00</TableCell>
            </TableRow>
=======
            {result?.map((item) => {
              return (
                <TableRow className="cursor-pointer" key={item?.id}>
                  <TableCell>
                    <div className="font-medium">
                      {item?.user?.first_name + " " + item?.user?.last_name}
                    </div>
                    <div className=" text-sm text-muted-foreground md:inline">
                      {item?.user?.phone_number}
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
>>>>>>> 33908d9e0f6126025c59082eb7dc2ba947a8d90b
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransaction;
