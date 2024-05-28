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

import DeliverBy from "./DeliverBy";
import EditOrderStatusDialog from "./EditOrderStatusDialog";
import useEditOrderData from "@/hook/useEditOrderData";
import { LoaderIcon } from "lucide-react";

const OrderAction = ({ item }) => {
  // function to get the active drivers

  const { deleteOrderData, loading } = useEditOrderData();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Delete
              {loading && <LoaderIcon className="animate-spin" />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                order and remove the data from servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteOrderData({ id: item.id })}
              >
                Continue
                {loading && <LoaderIcon className="animate-spin" />}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuSeparator />
        <EditOrderStatusDialog item={item} />
        <DropdownMenuSeparator />
        <DeliverBy item={item} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderAction;
