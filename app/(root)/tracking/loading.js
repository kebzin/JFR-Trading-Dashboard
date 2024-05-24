import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <Skeleton className="h-10  w-full" />
    </div>
  );
};

export default loading;
