import CustomersTable from "@/components/customerComponent/CustomersTable";
import { GetCustomers } from "@/libs/superbase/serverAction/userServerAction";
import React from "react";

const Costumer = async () => {
  const result = await GetCustomers();
  return (
    <div className="flex min-h-screen w-full flex-col mt-24 ml-10  sm:pl-14">
      <CustomersTable customer={result} />
    </div>
  );
};

export default Costumer;
