import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import OrderDetails from "@/components/order/OrderDetails";
import OrderTable from "@/components/order/OrderTable";
import ThisWeekOrderTotal from "@/components/order/ThisWeekOrderTotal";
import ThisMonthTotal from "@/components/order/ThisMonthTotal";

const Orders = () => {
  return (
    <div className="flex min-h-screen w-full flex-col  mt-20">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>
              <Suspense>
                <ThisWeekOrderTotal />
              </Suspense>
              <Suspense>
                <ThisMonthTotal />
              </Suspense>
            </div>
            {/* order table */}
            <Suspense>
              <OrderTable />
            </Suspense>
          </div>
          <div>
            {/* order details */}
            <Suspense>
              {" "}
              <OrderDetails />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
