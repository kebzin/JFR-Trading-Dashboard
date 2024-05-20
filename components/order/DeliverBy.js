"use client";
import React, { useEffect, useState } from "react";
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
import { GetActiveDriver } from "@/libs/superbase/serverAction/OrderServerAction";
import { LoaderIcon } from "lucide-react";
import useEditOrderData from "@/hook/useEditOrderData"; // Adjust the import path as necessary

const DeliverBy = ({ item }) => {
  const [driver, setDriver] = useState(item?.deliver_by?.id);
  const [activeDrivers, setActiveDrivers] = useState([]);
  const { editOrderData, loading } = useEditOrderData();

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetActiveDriver();
      setActiveDrivers(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Assign Driver
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign a driver to deliver this product</DialogTitle>
            <DialogDescription>
              The driver assigned to deliver this order will be responsible for
              updating the order status to complete once the delivery is
              successfully made. This ensures accurate tracking and confirmation
              of the order fulfillment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Role" className="text-right">
                Status
              </Label>
              <Select value={driver} onValueChange={(e) => setDriver(e)}>
                <SelectTrigger
                  className="w-full col-span-3"
                  id="role"
                  aria-label="Select order status"
                >
                  <SelectValue
                    className="w-full"
                    placeholder={`${
                      item?.deliver_by === null
                        ? "Select Driver"
                        : item.deliver_by.first_name +
                          " " +
                          item.deliver_by.last_name
                    }`}
                    value={driver}
                  />
                </SelectTrigger>
                <SelectContent>
                  {activeDrivers?.map((driver) => (
                    <SelectItem key={driver.id} value={driver.id}>
                      {driver.first_name + " " + driver.last_name}{" "}
                      {driver?.phone_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              onClick={() =>
                editOrderData({
                  id: item.id,
                  data: {
                    deliver_by: driver,
                  },
                })
              }
              type="submit"
            >
              {loading && <LoaderIcon className="animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeliverBy;
