import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const load = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const loading = () => {
  return (
    <div className="grid grid-cols-2  mt-24 sm:pl-14  gap-4 ">
      {load.map(() => {
        return <Skeleton key={Math.random()} className="h-10 " />;
      })}
    </div>
  );
};

export default loading;
