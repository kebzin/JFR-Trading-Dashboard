"use client";
import { useState } from "react";

import { toast } from "sonner";
import { CheckCircle, FileTerminal, LoaderIcon } from "lucide-react";
import {
  DeleteProduct,
  UpdateProduct,
} from "@/libs/superbase/serverAction/getProduct";

const useProduct = () => {
  const [loading, setLoading] = useState(false);

  const validateData = (data) => {
    if (!data || Object.keys(data).length === 0) {
      toast("Validation Error", {
        description: "No data provided for update.",
        icon: <FileTerminal className="text-destructive" />,
      });
      return false;
    }

    // Add more field-specific validations as needed

    return true;
  };

  const EditProductData = async ({ id, data }) => {
    if (!validateData(data)) {
      return;
    }

    setLoading(true);
    toast("Processing", {
      description: "Processing your request",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const result = await UpdateProduct({ id, data });
      console.log(result);

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

  // implementing the delet product
  const DeleteProductFromStore = async ({ id }) => {
    setLoading(true);
    toast("Processing", {
      description: "Processing your request",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const result = await DeleteProduct({ id });
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

  return { EditProductData, loading, DeleteProductFromStore };
};

export default useProduct;
