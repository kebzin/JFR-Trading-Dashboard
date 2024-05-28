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
import AddProductImages from "./AddProductImages";
import AddProductDetails from "./AddProductDetails";
import { CheckCheck, LoaderIcon, ShieldAlert } from "lucide-react";
import { useState } from "react";
import useProduct from "@/hook/useProduct";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

export function EditProduct({ item }) {
  const [isLoading, setIsloading] = useState(false);
  const [images, setImages] = useState(item?.product_image);
  const [productName, setProductName] = useState(item?.name);
  const [productDescription, setProductDescription] = useState(
    item?.description
  );
  const [productPrice, setProductPrice] = useState(item?.price);
  const [productQuantity, setProductQuantity] = useState(item?.quantity);
  const [productCategory, setProductCategory] = useState(item.category);
  const [productDiscount, setProductDiscount] = useState(item?.discount);
  const { EditProductData, loading } = useProduct();

  const supabase = createClientComponentClient();

  const productUpdate = async () => {
    try {
      let imageUrl = images;

      if (images !== item?.product_image) {
        toast("Uploading product image...", {
          description: "Uploading product image...",
          icon: <LoaderIcon className="animate-spin text-pretty" />,
        });

        const filePath = `${"product-images"}/${new Date().getTime()}.png`;
        const { error: imageUploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, images);

        if (imageUploadError) {
          toast(imageUploadError.message, {
            description: imageUploadError.message,
            icon: <ShieldAlert className=" text-destructive" />,
          });
          return;
        }

        const { data: ImageUrlData, error: ImageUrlError } =
          await supabase.storage.from("product-images").getPublicUrl(filePath);

        if (ImageUrlError) {
          toast(ImageUrlError.message, {
            description: ImageUrlError.message,
            icon: <ShieldAlert className=" text-destructive" />,
          });
          await supabase.storage.from("product-images").remove([filePath]);
          return;
        }

        imageUrl = ImageUrlData.publicUrl;
      }

      const data = {
        name: productName,
        category: productCategory,
        description: productDescription,
        price: productPrice,
        discount: productDiscount,
        product_image: imageUrl,
        quantity: productQuantity,
      };

      await EditProductData({ id: item.id, data });

      toast("Product updated successfully!", {
        description: "The product details have been updated.",
        icon: <CheckCheck className="bg-primary" />,
      });
    } catch (error) {
      toast("Something went wrong", {
        description: "Something went wrong with your request.",
        icon: <ShieldAlert className="text-destructive" />,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Product
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="w-[100%] h-[100%] overflow-scroll"
      >
        <SheetHeader>
          <SheetTitle className="">Edit Product</SheetTitle>
          <SheetDescription>
            Please note that if a user has already ordered this product, any
            price changes made before the delivery is completed will not affect
            their original order price
          </SheetDescription>
        </SheetHeader>
        <div className="flex min-h-screen w-full flex-col  sm:pl-20">
          <div className="flex flex-col sm:gap-4 sm:py-4 ">
            <main className="grid flex-1 items-start gap-4 p-4  sm:py-0 md:gap-8">
              <div className=" grid  flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button
                      disabled={loading}
                      onClick={productUpdate}
                      className="text-white"
                    >
                      {loading && (
                        <LoaderIcon className="animate-spin text-pretty" />
                      )}
                      Save Product
                    </Button>
                    <SheetClose>
                      <Button variant="outline" size="sm">
                        Discard
                      </Button>
                    </SheetClose>
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
                </div>
              </div>
            </main>
          </div>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button type="submit" onClick={productUpdate}>
              Save changes
            </Button>
            <Button variant="outline" size="sm">
              Discard
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
