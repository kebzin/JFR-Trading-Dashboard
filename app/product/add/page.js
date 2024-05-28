"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCheckIcon,
  CheckCircle,
  ChevronLeft,
  LoaderIcon,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import AddProductImages from "@/components/productComponent/AddProductImages";
import AddProductDetails from "@/components/productComponent/AddProductDetails";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

const AddProduct = () => {
  const [isLoading, setIsloading] = useState(false);
  const [images, setImages] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDiscount, setProductDiscount] = useState("2");
  const supabase = createClientComponentClient();

  // current login user

  //   // Function to get the user's session
  //   async function getSessionData() {

  //   handle product add

  const handleProductAdd = async (e) => {
    e.preventDefault();
    setIsloading(true);
    if (
      productName === "" ||
      productDescription === "" ||
      productPrice === "" ||
      productQuantity === "" ||
      productCategory === "" ||
      productDiscount === ""
    ) {
      setIsloading(false);
      toast("Please fill all the fields", {
        description: "Please all the fields are required. ",
        icon: <ShieldAlert className=" text-destructive" />,
        status: "error",
        important: "Please fill all the fields",
        className: "text-danger",
      });
      return;
    }

    // upload the image to the superbase
    toast("Adding product Image", {
      description: "Adding Product Image in progress ...",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    const filePath = `${"product-images"}/${new Date().getTime()}.png`;
    const contentType = "image/png";
    const { data: imageUpload, error: imageUploaderror } =
      await supabase.storage
        .from("product-images")
        .upload(filePath, images, contentType);

    if (imageUploaderror) {
      toast(imageUploaderror.message, {
        description: imageUploaderror.message,
        icon: <ShieldAlert className=" text-destructive" />,
      });
      setIsloading(false);
      console.log(imageUploaderror);
      return;
    }
    //
    // get the files url which was just created
    const { data: ImageUrl, error: ImageUrlError } = await supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);
    if (ImageUrlError) {
      toast(ImageUrlError.message, {
        description: ImageUrlError.message,
        icon: <ShieldAlert className=" text-destructive" />,
      });
      //   reverse the uploade when something wen wrong
      await supabase.storage.from("product-images").remove(filePath);
      setIsloading(false);
      return;
    }

    toast("Adding product detail", {
      description: "Adding Product detail in progress ...",
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });

    try {
      // once the product image have been uploaded then add the product detail and attach the product url
      const { data, error } = await supabase.from("products").insert([
        {
          name: productName,
          description: productDescription,
          price: productPrice,
          quantity: productQuantity,
          category: productCategory,
          discount: productDiscount,
          added_by: "b9656ed7-cd2f-437f-9ba6-3e48d22b74aa",
          product_image: ImageUrl.publicUrl,
        },
      ]);
      if (error) {
        toast(error.message, {
          description: error.message,
          icon: <ShieldAlert className=" text-destructive" />,
        });
        setIsloading(false);
        // when something went wrong revers the the process and delete the product image
        await supabase.storage.from("product-images").remove(filePath);
        console.log(error);
        return;
      }
      setIsloading(false);
      toast(" product Added", {
        description: `product have been Succesfull`,
        icon: <CheckCircle className=" text-primary" />,
      });
      setIsloading(false);
      //   set all the fill to empty
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductQuantity("");
      setProductCategory("");
      setProductDiscount("");
      setImages(null);
    } catch (error) {
      toast(error.message, {
        description: error.message,
        icon: <ShieldAlert className=" text-destructive" />,
      });
      setIsloading(false);
    } finally {
      setIsloading(false);
    }
  };
  // select imge from the device and display the image function

  return (
    <div className="flex min-h-screen w-full flex-col  pt-28 sm:pl-20">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-start gap-4 p-4  sm:py-0 md:gap-8">
          <div className=" grid  flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>

              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  disabled={isLoading}
                  onClick={handleProductAdd}
                  className="text-white"
                >
                  {isLoading && (
                    <LoaderIcon className="animate-spin text-pretty" />
                  )}
                  Save Product
                </Button>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap ">
              {/* product details */}
              <AddProductDetails
                productName={productName}
                setProductName={setProductName}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
                productPrice={productPrice}
                setProductPrice={setProductPrice}
                productQuantity={productQuantity}
                setProductQuantity={setProductQuantity}
                productCategory={productCategory}
                setProductCategory={setProductCategory}
                productDiscount={productDiscount}
                setProductDiscount={setProductDiscount}
              />{" "}
              {/* product image */}
              <AddProductImages images={images} setImages={setImages} />
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AddProduct;
