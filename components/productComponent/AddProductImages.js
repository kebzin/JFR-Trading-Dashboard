import React, { useState } from "react";
import Image from "next/image";
import { DoorClosed, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Toggle } from "../ui/toggle";

const AddProductImages = ({ images, setImages }) => {
  const [imageUrl, setImageUrl] = useState();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setImageUrl(fileUrl);
    setImages(file);
  };
  return (
    <div className="grid auto-rows-max items-start gap-4  lg:col-span-1 lg:gap-8">
      <Card className="">
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover lg:max-w-[300px]"
              height="300"
              src={
                images === "" || null || undefined
                  ? "/placeholder.webp"
                  : imageUrl
              }
              width="300"
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <Image
                  alt={`Product image`}
                  className="aspect-square  rounded-md object-cover"
                  src={
                    images === "" || null || undefined
                      ? "/placeholder.webp"
                      : imageUrl
                  }
                  height="84"
                  width="80"
                />
                <Toggle
                  onClick={() => {
                    setImageUrl(""), setImageUrl("");
                  }}
                  className="absolute top-0 right-0 bg-destructive w-10 h-10"
                >
                  <X />
                </Toggle>
              </div>

              <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed  relative">
                <Upload className="h-4 w-10 max-w-10 " />
                <Input
                  onChange={handleImageChange}
                  id="image-upload"
                  placeholder="Upload image"
                  multiple
                  accept="image/*"
                  capture="environment"
                  type="file"
                  className="w-full h-full absolute left-0 ring-0 top-0 bottom-0 bg-transparent "
                />
                <span className="sr-only">Upload</span>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductImages;
