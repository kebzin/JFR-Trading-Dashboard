"use client";
import React from "react";

import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import Link from "next/link";

const SearchProductComponent = () => {
  return (
    <div className="ml-auto flex items-center gap-2">
      {/* search */}
      <Input placeholder="Search for product" />
      <Button variant="secondary">
        <Search className="h-5 w-5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Search
        </span>
      </Button>
      <Link href={"product/add"}>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default SearchProductComponent;
