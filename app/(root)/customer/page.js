import CustomersTable from "@/components/customerComponent/CustomersTable";
import React from "react";

const Costumer = () => {
  return (
    <div className="flex min-h-screen w-full flex-col mt-24 ml-10  sm:pl-14">
      <CustomersTable />
    </div>
  );
};

export default Costumer;
