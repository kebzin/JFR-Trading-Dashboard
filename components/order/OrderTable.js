import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
  DetermingOrderStatus,
  convertToReadableDate,
  formatCurrency,
  getStatusColorClass,
} from "@/lib/utils";
import Image from "next/image";
import profilePicture from "../../public/profilePhoto.png";
import ORderView from "./OrderView";
import OrderAction from "./OrderAction";

const OrderTable = ({ order }) => {
  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">All Orders</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Last 7 days
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>This month</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last Month</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>All Months</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>

                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Driver</TableHead>
                  <TableHead className="hidden sm:table-cell">Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.map((item) => {
                  return (
                    <TableRow className="cursor-pointer" key={item?.id}>
                      <TableCell className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <Image
                            src={profilePicture}
                            height={36}
                            width={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                          />
                        </Button>
                        <ORderView item={item} />
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className={getStatusColorClass(item?.status)}
                          variant="outline"
                        >
                          {DetermingOrderStatus(item?.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className=" hidden sm:table-cell  line-clamp-2 ">
                        {convertToReadableDate(item?.created_at)}
                        {/* {item?.created_at} */}
                      </TableCell>

                      <TableCell className=" items-center gap-2 hidden sm:table-cell">
                        <div className=" ">
                          <div className="flex items-center gap-2 text-xs text-primary">
                            <span>{item?.deliver_by?.first_name}</span>
                            <span>{item?.deliver_by?.last_name}</span>
                          </div>

                          <div className=" text-sm text-primary">
                            {item?.deliver_by?.phone_number}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="hidden sm:table-cell">
                        {formatCurrency(item?.Total)}
                      </TableCell>
                      <TableCell className="">
                        <OrderAction item={item} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default OrderTable;
