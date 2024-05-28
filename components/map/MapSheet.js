"use client";
import { Button } from "@/components/ui/button";
import { Image, LoaderCircle } from "lucide-react";
import profilePicture from "../../public/profilePhoto.png";
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
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

export function MapSheet({ customers }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const handleSheetOpen = () => {
    setIsSheetOpen(true);
  };

  if (!isLoaded) {
    return (
      <div>
        <p>Loading map...</p>
        <LoaderCircle className="animate-spin text-pretty" />
      </div>
    );
  }

  return (
    <Sheet onOpenChange={handleSheetOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center hover:bg-gray-400 cursor-pointer rounded-md p-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Image
              src={profilePicture}
              height={36}
              width={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
          <div>
            <div className="flex items-center gap-2 text-lg">
              <span>{customers?.first_name}</span>
              <span>{customers?.last_name}</span>
            </div>
            <div className="text-sm text-primary">
              {customers?.phone_number}
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[100%] h-[100%]">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <div>
          {isSheetOpen && (
            <GoogleMap
              mapContainerStyle={{
                height: "50vh",
                width: "50%",
              }}
              zoom={8}
              options={{
                scrollwheel: false, // Disable scrollwheel zoom
              }}
            ></GoogleMap>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
