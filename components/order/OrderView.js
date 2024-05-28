"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import OrderDetails from "./OrderDetails";

const ORderView = ({ item }) => {
  return (
    <div className="">
      <Sheet className="">
        <SheetTrigger asChild>
          <div className=" ">
            <div className="flex items-center gap-2 text-xs text-primary">
              <span>{item?.user?.first_name}</span>
              <span>{item?.user?.last_name}</span>
            </div>

            <div className=" text-sm text-primary">
              {item?.user?.phone_number}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent
          className="md:w-[50%] md:h-[100%] h-[90%] overflow-scroll scroll-px-0"
          side={"bottom"}
        >
          <SheetHeader></SheetHeader>
          <div className="grid gap-4 py-4">
            <OrderDetails item={item} />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default ORderView;
