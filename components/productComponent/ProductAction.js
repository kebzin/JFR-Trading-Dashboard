"use client";
import React, { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { EditProduct } from "./EditProduct";
import useProduct from "@/hook/useProduct";
import { LoaderIcon } from "lucide-react";

const ProductAction = ({ item }) => {
  const { DeleteProductFromStore, loading } = useProduct();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="">
          Action
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              Delete
              {loading && <LoaderIcon className="animate-spin" />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                product and remove the data from servers. This will have some
                impact when this product is already order
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => DeleteProductFromStore({ id: item.id })}
              >
                Continue
                {loading && <LoaderIcon className="animate-spin" />}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuSeparator />
        <AlertDialog>
          <EditProduct item={item} />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductAction;
