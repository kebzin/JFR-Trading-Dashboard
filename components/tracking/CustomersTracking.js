"use client";
import React, { useEffect, useState } from "react";
import GoogleMapView from "../map/GoogleMapView";
import MapUSerSearch from "../map/MapUSerSearch";
import { GetUsers } from "@/libs/superbase/serverAction/userServerAction";

const CustomersTracking = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await GetUsers({ user_role: "customer" });
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-wrap sm:flex-nowrap gap-5 ">
      <MapUSerSearch data={data} />
      <GoogleMapView data={data} loading={loading} />
    </div>
  );
};

export default CustomersTracking;
