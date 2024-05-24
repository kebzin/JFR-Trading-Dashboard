import Image from "next/image";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";

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
                <CardTitle className="text-sm font-semibold text-pretty">
                  {item?.name}
                </CardTitle>
                <div className="flex items-center flex-wrap justify-between">
                  <p className="text-pretty mt-2">
                    {formatCurrency(item?.price)}
                  </p>
                  <CardDescription>
                    <span>Category :</span> {item?.category}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-between">
                  <CardDescription className="">
                    <span>Discount </span>
                    <Button size="icon" variant="outline" className="">
                      {item?.discount}%
                    </Button>
                  </CardDescription>
                  <CardDescription>
                    <span>Quantity</span>
                    <Button size="icon" variant="outline" className="">
                      {item?.quantity}
                    </Button>
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
