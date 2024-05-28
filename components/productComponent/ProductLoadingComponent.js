import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

const ProductLoadingComponent = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
          <TableHead></TableHead>
          <TableHead>
            <Skeleton className="h-3" />
          </TableHead>
          <TableHead className="hidden md:table-cPriell">
            {" "}
            <Skeleton className="h-3" />
          </TableHead>
          <TableHead className="hidden md:table-cell">
            {" "}
            <Skeleton className="h-3" />
          </TableHead>
          <TableHead className="hidden md:table-cell">
            {" "}
            <Skeleton className="h-3" />
          </TableHead>

          <TableHead className="hidden md:table-cell">
            {" "}
            <Skeleton className="h-3" />
          </TableHead>
          <TableHead>
            <span className="sr-only">
              {" "}
              <Skeleton className="h-3" />
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(10).map((item) => (
          <>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-7 " />
              </TableCell>
              <TableCell className="font-medium">
                {" "}
                <Skeleton className="h-3" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-3" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-3" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-3" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-3" />
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-3" />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductLoadingComponent;
