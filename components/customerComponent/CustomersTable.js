"use client";
import React, { useState } from "react";
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
} from "@/components/ui/alert-dialog";

import { CheckCircle, FileTerminal, LoaderIcon, Search } from "lucide-react";
import UserPagination from "../user/UserPagination";
// import { invoices } from "../user/DataTable";
// import AddUser from "../user/AddUsers";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import AddUsers from "../user/AddUsers";
import { convertToReadableDate } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AlertDialogPopup } from "../Share/AlertDialogPopup";
import { UpdateUSerData } from "@/libs/superbase/serverAction/userServerAction";
import { toast } from "sonner";
import EditUser from "../user/EditUser";

const CustomersTable = ({ customer }) => {
  const [loading, setLoading] = useState(false);
  // function to activate users
  const activateUser = async ({ id, data }) => {
    setLoading(true);
    toast("Processsing ", {
      description: `Processing your request `,
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const result = await UpdateUSerData({ id, data });
      // if the data return true it mean success else it mean error
      if (result === true) {
        setLoading(false);
        toast("Processing  successfully", {
          description: `Your request process  successfully`,
          icon: <CheckCircle className=" text-primary" />,
        });
        return;
      }
      // if the data return false it mean error
      else {
        setLoading(false);
        toast(result.errorMessage, {
          description: result.errorMessage,
          icon: <FileTerminal className="bg-destructive" />,
        });
        return;
      }
    } catch (error) {
      toast(error, {
        description: error.message,
        icon: <FileTerminal className="bg-destructive" />,
      });
    }
  };

  // function to suspend users

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
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Register date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Onboard</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Can order</TableHead>

                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex gap-3 ">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-muted-foreground">
                        {item?.first_name + " " + item?.last_name}
                      </p>
                      <p className="text-muted-foreground">
                        {item?.phone_number}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item?.location}</TableCell>
                  <TableCell>
                    {convertToReadableDate(item?.created_at)}
                  </TableCell>
                  <TableCell
                    className={`${
                      item?.active === true
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {item?.active === true ? "Active" : "Disabled"}
                  </TableCell>
                  <TableCell
                    className={`${
                      item?.onboarded === true
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {item?.onboarded === false ? "Onboard" : "Completed"}
                  </TableCell>
                  <TableCell>{item?.user_role}</TableCell>
                  <TableCell
                    className={`${
                      item?.confirm === true
                        ? "text-primary"
                        : "text-destructive"
                    } text-center `}
                  >
                    {item?.confirm === true ? "Yes" : "NO"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="outline" className="">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuSeparator />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              {item?.confirm === true
                                ? "Decativate"
                                : "Activate"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure you wan to{" "}
                                {item?.confirm === true
                                  ? "Decativate"
                                  : "Activate"}{" "}
                                this account?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {item?.confirm === true
                                  ? `Once completed,
                                the user will not have access to ordering
                                capabilities, allowing them not to place orders`
                                  : `Once completed,
                                the user will have access to ordering
                                capabilities, allowing them to place orders`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  if (item?.confirm === true) {
                                    activateUser({
                                      id: item.id,
                                      data: { confirm: "FALSE" },
                                    });
                                    return;
                                  }
                                  activateUser({
                                    id: item.id,
                                    data: { confirm: "TRUE" },
                                  });
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <DropdownMenuSeparator />

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                              {item?.active === true ? "Block" : "Un-Block"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure you want to{" "}
                                {item?.active === true ? "Block" : "Un-block"}?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will{" "}
                                {item?.active === true ? "Block" : "Un-Block"}{" "}
                                this account. If the account is{" "}
                                {item?.active === true ? "Block" : "Un-Block"}{" "}
                                user will {item?.active === true ? "not" : "be"}{" "}
                                Able to login to their account
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  if (item?.active === true) {
                                    activateUser({
                                      id: item.id,
                                      data: { active: "FALSE" },
                                    });
                                    return;
                                  }
                                  activateUser({
                                    id: item.id,
                                    data: { active: "TRUE" },
                                  });
                                }}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <DropdownMenuSeparator />

                        <EditUser
                          user={{
                            first_name: item?.first_name,
                            last_name: item?.last_name,
                            phone_number: item?.phone_number,
                            user_role: item?.user_role,
                            active: item?.active,
                            onboarded: item?.onboarded,
                            id: item?.id,
                          }}
                        />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <AlertDialog>
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
                    </AlertDialog> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <UserPagination />
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersTable;
