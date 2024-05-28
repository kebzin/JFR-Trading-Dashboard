"use client";

import { GetNotification } from "@/libs/superbase/serverAction/NotificationServerAction";
import { MessageDisplayed } from "@/components/notification.js/MessageDisplayed";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const NotificationsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  let page = parseInt(searchParams.get("page") || "1", 10);

  // Ensure the page number is always greater than zero
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  const limit = 5;
  const start = (page - 1) * limit;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      const data = await GetNotification({ start, limit });
      setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, [start, limit]);

  const handlePagination = (newPage) => {
    if (newPage < 1) return;
    router.push(`?page=${newPage}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center mt-20 pt-5">
      <div className="sm:gap-4 sm:py-4 sm:pl-20">
        <main>
          {loading && (
            <div>
              <p>loading ....</p>
              <Loader className="animate-spin" />
            </div>
          )}
          {!loading && <MessageDisplayed notifications={notifications} />}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${page - 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagination(page - 1);
                  }}
                  disabled={page === 1}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href={`?page=${page + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePagination(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
