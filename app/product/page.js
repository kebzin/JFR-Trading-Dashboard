import ProductComponentTable from "@/components/productComponent/ProductComponentTable";
import SearchProductComponent from "@/components/productComponent/SearchProductComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { GetAllProduct } from "@/libs/superbase/serverAction/getProduct";
import ProductCard from "@/components/productComponent/ProductCard";

const page = async () => {
  const data = await GetAllProduct();

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 container mt-28 sm:pl-20">
      <Tabs defaultValue="all">
        <div className="flex items-center mb-2">
          <TabsList>
            <TabsTrigger value="all">Product List</TabsTrigger>
          </TabsList>
          <TabsList>
            <TabsTrigger value="card">Product Card</TabsTrigger>
          </TabsList>
          {/* search product component */}
          <SearchProductComponent />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="all">
              <ProductComponentTable data={data} />
            </TabsContent>
          </CardContent>
          <TabsContent value="card">
            <ProductCard data={data} />
          </TabsContent>

          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      </Tabs>
    </main>
  );
};

export default page;
