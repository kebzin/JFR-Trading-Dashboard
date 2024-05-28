import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GoogleMapView from "@/components/map/GoogleMapView";
import CustomersTracking from "@/components/tracking/CustomersTracking";
import DriversTracking from "@/components/driverTracking/DriversTracking";

const Maps = () => {
  return (
    <div className="flex min-h-screen w-full flex-col  mt-20 pt-5">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <Tabs defaultValue="customers">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="drivers">Drivers</TabsTrigger>
              </TabsList>
            </div>{" "}
            <TabsContent value="customers">
              <Card x-chunk="">
                <CardHeader className="px-7">
                  <CardTitle>Tracking Customers</CardTitle>
                  <CardDescription>
                    Track your customer as see their location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CustomersTracking />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="drivers">
              <Card x-chunk="">
                <CardHeader className="px-7">
                  <CardTitle>Tracking Drivers</CardTitle>
                  <CardDescription>
                    Track your drivers as see their location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DriversTracking />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          {/* <div></div> */}
        </main>
      </div>
    </div>
  );
};

export default Maps;
