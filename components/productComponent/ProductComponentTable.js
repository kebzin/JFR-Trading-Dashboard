"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { convertToReadableDate, formatCurrency } from "@/lib/utils";
import ProductAction from "./ProductAction";

const ProductComponentTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=" w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className=" md:table-cell">Price</TableHead>
          <TableHead className=" md:table-cell">Total Sales</TableHead>
          <TableHead className=" md:table-cell">Quantity</TableHead>

          <TableHead className=" md:table-cell">Created at</TableHead>
          <TableHead className=" md:table-cell">Description</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => {
          return (
            <>
              <TableRow key={item?.id}>
                <TableCell className=" sm:table-cell">
                  <Image
                    alt={item?.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={`${
                      item?.product_image === null || undefined || ""
                        ? "/placeholder.webp"
                        : item?.product_image
                    }`}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{item?.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{`${item?.avelability}`}</Badge>
                </TableCell>
                <TableCell className=" md:table-cell">
                  {formatCurrency(item?.price)}
                </TableCell>
                <TableCell className=" md:table-cell">
                  {item?.total_sale}
                </TableCell>
                <TableCell className=" md:table-cell">
                  {item?.quantity}
                </TableCell>

                <TableCell className=" md:table-cell">
                  {convertToReadableDate(item?.created_at)}
                </TableCell>
                <TableCell className=" md:table-cell">
                  {item?.description}
                </TableCell>
                <TableCell>
                  <ProductAction item={item} />
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProductComponentTable;
