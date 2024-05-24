import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import profilePicture from "../../public/profilePhoto.png";

const MapUSerSearch = ({ data }) => {
  return (
    <div className="">
      <Input placeholder={"search for customers"} />

      <div className=" flex gap-4 flex-col">
        {data?.map((customers) => {
          return (
            <div
              key={customers.id}
              className=" flex items-center hover:bg-gray-400 cursor-pointer  rounded-md p-2 gap-3"
            >
              <Button variant="outline" size="icon" className="rounded-full">
                <Image
                  src={profilePicture}
                  height={36}
                  width={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
              <div className=" ">
                <div className="flex items-center gap-2 text-lg ">
                  <span>{customers?.first_name}</span>
                  <span>{customers?.last_name}</span>
                </div>

                <div className=" text-sm ">
                  <p className="text-primary">{customers?.phone_number}</p>
                  <p>{customers?.location}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapUSerSearch;
