import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useEditOrderData from "@/hook/useEditOrderData";
import { LoaderIcon } from "lucide-react";
import { DetermingOrderStatus } from "@/lib/utils";

const EditOrderStatusDialog = ({ item }) => {
  const [selectedStatus, setSelectedStatus] = useState(item.status);
  const { editOrderData, loading } = useEditOrderData();
  const handleSaveChanges = () => {
    editOrderData({
      id: item.id,
      data: { status: selectedStatus },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit order status</DialogTitle>
          <DialogDescription>
            Ensure you understand the current status of the order before making
            any changes. Once you modify the order status, the user who placed
            the order will be notified.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={(e) => setSelectedStatus(e)}
            >
              <SelectTrigger
                className="w-full col-span-3"
                id="status"
                aria-label="Select order status"
              >
                <SelectValue
                  className="w-full"
                  placeholder={DetermingOrderStatus({ status: selectedStatus })}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>Processing Order</SelectItem>
                <SelectItem value={2}>Out for Delivery</SelectItem>
                <SelectItem value={3}>Delivery Completed</SelectItem>
                <SelectItem value={4}>Cancel Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveChanges} disabled={loading}>
            {loading && <LoaderIcon className="animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderStatusDialog;
