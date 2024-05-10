import TotalRevenue from "@/components/dashboard/TotalRevenue";
import TopSales from "@/components/dashboard/TopSales";
import Salse from "@/components/dashboard/Salse";
import NumberOfUsers from "@/components/dashboard/NumberOfUsers";
import RecentTransaction from "@/components/dashboard/RecentTransaction";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import RecentLastOrder from "@/components/dashboard/RecentLastOrder";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col sm:pl-14">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6"></header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Suspense
            fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
          >
            <TotalRevenue />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
          >
            <TopSales />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
          >
            <Salse />
          </Suspense>
          <Suspense
            fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
          >
            <NumberOfUsers />
          </Suspense>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Suspense
            fallback={
              <div className="space-y-2">
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-7 w-full" />
              </div>
            }
          >
            <RecentTransaction />
          </Suspense>

          <RecentLastOrder />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
