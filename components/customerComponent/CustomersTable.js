"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import {
  CheckCheckIcon,
  Search,
  SearchCheckIcon,
  UserPlus,
} from "lucide-react";
import UserPagination from "../user/UserPagination";
import { invoices } from "../user/DataTable";
import AddUser from "../user/AddUsers";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AddUsers from "../user/AddUsers";

const CustomersTable = () => {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap pb-10 pt-5">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Costumers
        </h3>

        <div className="flex items-center  max-md:w-full gap-4  max-md:flex-wrap-reverse">
          <div className="flex items-center ">
            <Input type="text" placeholder="Search for customers" />
            <Button variant="outline" className="">
              <Search />
              Search
            </Button>
          </div>
          <div>
            <AddUser lable="Add Customers" />
          </div>
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User</TableHead>
                <TableHead>Register by</TableHead>
                <TableHead>Register date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium flex gap-3 ">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">kebba waiga</p>
                      <p className="text-muted-foreground">2493268</p>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.registerBy}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell
                    className={`${
                      invoice.status === "Active" ? "text-primary" : ""
                    }`}
                  >
                    {invoice.status}
                  </TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger className="bg-destructive/50 py-2 px-2 rounded-md text-white">
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              toast("Event has been created", {
                                description:
                                  "Sunday, December 03, 2023 at 9:00 AM",
                                icon: (
                                  <CheckCheckIcon className="text-primary" />
                                ),
                                action: {
                                  label: "Undo",
                                  onClick: () => console.log("Undo"),
                                },
                              })
                            }
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <UserPagination />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersTable;
