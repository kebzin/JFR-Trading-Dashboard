"use client";
import { useState } from "react";
import {
  DeleteOrder,
  EditOrder,
} from "@/libs/superbase/serverAction/OrderServerAction";
import { toast } from "sonner";
import { CheckCircle, FileTerminal, LoaderIcon } from "lucide-react";

const useEditOrderData = () => {
  const [loading, setLoading] = useState(false);

  const validateData = (data) => {
    if (!data || Object.keys(data).length === 0) {
      toast("Validation Error", {
        description: "No data provided for update.",
        icon: <FileTerminal className="text-destructive" />,
      });
      return false;
    }
    if ("deliver_by" in data && !data.deliver_by) {
      toast("Validation Error", {
        description: "Please assign a driver before proceeding.",
        icon: <FileTerminal className="text-destructive" />,
      });
      return false;
    }
    // Add more field-specific validations as needed
    if ("status" in data && !data.status) {
      toast("Validation Error", {
        description: "Please Choosed a status before proceeding.",
        icon: <FileTerminal className="text-destructive" />,
      });
      return false;
    }

    return true;
  };

  const editOrderData = async ({ id, data }) => {
    if (!validateData(data)) {
      return;
    }

    setLoading(true);
    toast("Processing", {
      description: "Processing your request",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const result = await EditOrder({ id, data });
      if (typeof result === "object") {
        toast(result.errorCode, {
          description: result.errorMessage,
          icon: <FileTerminal className="text-destructive" />,
        });
        setLoading(false);
        return;
      }
      toast("Process Compleated ", {
        description: "Process completed successfully",
        icon: <CheckCircle className="text-primary" />,
      });
    } catch (error) {
      toast(error.message, {
        description: error.message,
        icon: <FileTerminal className="text-destructive" />,
      });
    } finally {
      setLoading(false);
    }
  };

  // implementing the delet order
  const deleteOrderData = async ({ id }) => {
    setLoading(true);
    toast("Processing", {
      description: "Processing your request",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const result = await DeleteOrder({ id });
      if (typeof result === "object") {
        toast(result.errorCode, {
          description: result.errorMessage,
          icon: <FileTerminal className="text-destructive" />,
        });
        setLoading(false);
        return;
      }
      toast("Process Compleated ", {
        description: "Process completed successfully",
        icon: <CheckCircle className="text-primary" />,
      });
    } catch (error) {
      toast(error.message, {
        description: error.message,
        icon: <FileTerminal className="text-destructive" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return { editOrderData, loading, deleteOrderData };
};

export default useEditOrderData;
