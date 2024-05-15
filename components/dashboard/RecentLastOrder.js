import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  Truck,
} from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { GetLatestFiveRecentOrder } from "@/libs/superbase/serverAction/OrderServerAction";
import {
  DetermingOrderStatus,
  convertToReadableDate,
  formatCurrency,
} from "@/lib/utils";

const RecentLastOrder = async () => {
  const result = await GetLatestFiveRecentOrder({ limit: 1, start: 1, end: 1 });

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            #Order {result[0]?.order_number}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            ></Button>
          </CardTitle>
          <CardDescription>
            {convertToReadableDate(result[0]?.created_at)}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1 flex-col">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Track Order
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {result[0]?.product?.map((item, index) => {
              // // console.log(item);
              // <Button size="icon" variant="outline" className="h-6 w-6">
              //         {item?.quantity}
              //       </Button>
              return (
                <div key={index}>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">{item?.name}</span>
                    <span>{formatCurrency(item?.price)}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{item?.quantity}</span>
                  </li>
                </div>
              );
            })}

            {/* <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Aqua Filters x <span>1</span>
              </span>
              <span>$49.00</span>
            </li> */}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(0)}</span>
            </li>

            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(result[0]?.Total)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>Gambia</span>
              <span>{result[0]?.users?.location}</span>
            </address>
          </div>
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Billing Information</div>
            <div className="text-muted-foreground">
              Same as shipping address
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>
                {result[0]?.users?.first_name +
                  " " +
                  result[0]?.users?.last_name}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a href="tel:">{result[0]?.users?.phone_number}</a>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-5">
              <dt className="text-muted-foreground">Location</dt>
              <dd>
                <a href="mailto:">{result[0]?.users?.location}</a>
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Payment Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Cash
              </dt>
              <dd>{DetermingOrderStatus(result[0]?.status)}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Order
          <time dateTime={convertToReadableDate(result[0]?.created_at)}>
            {convertToReadableDate(result[0]?.created_at)}
          </time>
        </div>
        <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="sr-only">Previous Order</span>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" className="h-6 w-6">
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="sr-only">Next Order</span>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};

export default RecentLastOrder;
