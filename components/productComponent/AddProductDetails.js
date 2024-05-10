// components/AddProductDetails.js
"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

const AddProductDetails = ({
  productName,
  setProductName,
  productDescription,
  setProductDescription,
  productPrice,
  setProductPrice,
  productQuantity,
  setProductQuantity,
  productCategory,
  setProductCategory,
  productDiscount,
  setProductDiscount,
}) => {
  // handle productCategory select

  return (
    <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Please enter your product details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid">
              <Label htmlFor="Product name">Name</Label>
              <Input
                onChange={(event) => setProductName(event.target.value)}
                value={productName}
                id="name"
                type="text"
                placeholder="Enter product name"
                className="w-full"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input
                      onChange={(event) => {
                        setProductPrice(event.target.value);
                      }}
                      id="price-3"
                      type="number"
                      placeholder="Enter price"
                      defaultValue="99.99"
                      value={productPrice}
                    />
                    <TableHead>Quantity</TableHead>
                    <Input
                      onChange={(event) =>
                        setProductQuantity(event.target.value)
                      }
                      id="product-quantity"
                      placeholder="Enter product quantity"
                      type="number"
                      defaultValue="0"
                      value={productQuantity}
                    />
                  </TableCell>

                  <TableCell>
                    <Select
                      onValueChange={(event) => {
                        setProductCategory(event);
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        id="category"
                        aria-label="Select category"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="b" value="clothing">
                          Clothing
                        </SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                    <TableHead>Discount</TableHead>
                    <Select
                      onValueChange={(event) => {
                        setProductDiscount(event);
                      }}
                    >
                      <SelectTrigger
                        className="w-full"
                        id="discount"
                        aria-label="Apply Discount"
                      >
                        <SelectValue placeholder="Select percentage" />
                      </SelectTrigger>
                      <SelectContent
                      //  selet selected value
                      >
                        <SelectItem className="0" value="0%">
                          Select Discount Percentage
                        </SelectItem>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="1">1%</SelectItem>
                        <SelectItem value="2">2%</SelectItem>
                        <SelectItem value="3">3%</SelectItem>
                        <SelectItem value="4">4%</SelectItem>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="6">6%</SelectItem>
                        <SelectItem value="7">7%</SelectItem>
                        <SelectItem value="8">8%</SelectItem>
                        <SelectItem value="9">9%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                onChange={(event) => setProductDescription(event.target.value)}
                id="description"
                placeholder="Enter product description"
                className="min-h-32"
                value={productDescription}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductDetails;
