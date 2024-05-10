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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CheckCheckIcon,
  FileTerminal,
  LoaderIcon,
  MoreHorizontal,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { DeleteProduct } from "@/libs/superbase/serverAction/getProduct";

const ProductComponentTable = ({ data }) => {
  const deleteSinglProduct = async (id) => {
    toast("Deleting product", {
      description: "Deleting product in progress...",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });

    try {
      const data = await DeleteProduct({ id });
      console.log(data);

      if (data) {
        toast(data.message, {
          description: data.message,
          icon: <FileTerminal className=" text-destructive" />,
        });
      }
      // success
      else {
        toast("Product Deleted ", {
          description: "Product Deleted successfully c",
          icon: <CheckCheckIcon className=" text-success" />,
        });
        // refresh the page
      }
    } catch (error) {
      toast(error.message, {
        description: error.message,
        icon: <FileTerminal className=" text-destructive" />,
      });
    }
  };
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
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <>
            <TableRow>
              <TableCell key={item?.id} className=" sm:table-cell">
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
              <TableCell className=" md:table-cell">{item?.price}</TableCell>
              <TableCell className=" md:table-cell">
                {item?.total_sale}
              </TableCell>
              <TableCell className=" md:table-cell">{item?.quantity}</TableCell>

              <TableCell className=" md:table-cell">
                {item?.created_at}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-destructive/50 py-2 px-2 rounded-md text-white">
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteSinglProduct(item.id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>{" "}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductComponentTable;
