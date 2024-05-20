import Image from "next/image";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/utils";

const ProductCard = ({ data }) => {
  return (
    <>
      <div className="mt-3 container">
        {/* map through the data */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {data?.map((item, index) => (
            <Card key={index} className="transition-all">
              <CardContent>
                <Image
                  src={item?.product_image}
                  alt={item?.name}
                  className="rounded-lg h-40 w-40"
                  width={100}
                  height={100}
                />
                <CardTitle className="text-sm font-semibold">
                  {item?.name}
                </CardTitle>
                <div className="flex items-center flex-wrap justify-between">
                  <CardDescription>
                    {formatCurrency(item?.price)}
                  </CardDescription>
                  <CardDescription>
                    {" "}
                    <span>Category :</span> {item?.category}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-between">
                  <CardDescription className="">
                    <span>Discount </span> {item?.discount}
                  </CardDescription>
                  <CardDescription>
                    <span>Quantity</span>
                    {item?.quantity}
                  </CardDescription>
                </div>

                <CardDescription>{item?.avelability}</CardDescription>
                <CardDescription>{item?.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
