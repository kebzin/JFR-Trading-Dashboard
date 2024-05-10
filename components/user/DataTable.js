"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserPagination from "./UserPagination";
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
  MoreHorizontal,
  Search,
  LoaderIcon,
  FileTerminal,
  CheckCheckIcon,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import AddUser from "./AddUsers";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EditUser from "./EditUser";
import {
  DeleteUser,
  SuspendUser,
} from "@/libs/superbase/serverAction/userServerAction";
import { startTransition, useState } from "react";
import { Badge } from "../ui/badge";

export const invoices = [
  {
    invoice: "INV001",
    status: "Suspend",
    totalAmount: "$250.00",
    paymentMethod: "Super Admin",
    date: "friday 29 May 2014",
    registerBy: "kebba waiga",
  },
  {
    invoice: "INV002",
    status: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "Driver",
    date: "friday 30 May 2014",
    registerBy: "kebba waiga",
  },
  {
    invoice: "INV003",
    status: "Active",
    totalAmount: "$350.00",
    paymentMethod: "Sub Admin",
    date: "friday 31 May 2014",
    registerBy: "kebba waiga",
  },
  {
    invoice: "INV004",
    status: "Active",
    totalAmount: "$450.00",
    paymentMethod: "Driver",
    date: "friday 01 Jun 2014",
    registerBy: "kebba waiga",
  },
  {
    invoice: "INV005",
    status: "Suspend",
    totalAmount: "$550.00",
    paymentMethod: "Driver",
    date: "friday 02 Jun 2014",
    registerBy: "kebba waiga",
  },
  {
    invoice: "INV006",
    status: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
    date: "friday 03 Jun 2014",
    registerBy: "kebba waiga",
  },
  {
    invoice: "INV007",
    status: "Suspend",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
    date: "friday 04 Jun 2014",
    registerBy: "kebba waiga",
  },
];

export function UserDataTable({ users }) {
  const [loading, setLoading] = useState(false);
  // delete user
  const HandleUserDelete = async (id) => {
    setLoading(true);

    toast("deleing in process", {
      description: `deleting  user in progress`,
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });

    try {
      const result = await DeleteUser({ id });
      const returnValueTrpe = typeof result === "object" ? false : true;

      if (returnValueTrpe === false) {
        toast(result.errorCode, {
          description: result.errorMessage,
          icon: <FileTerminal className=" text-destructive" />,
        });
        setLoading(false);
        return;
      }
      // success

      toast("User Deleted", {
        description: `user  has been added successfully`,
        icon: <CheckCheckIcon className=" text-success" />,
      });
      setLoading(false);
    } catch (error) {
      toast(error, {
        description: error.message,
        icon: <FileTerminal className=" text-destructive" />,
      });
    } finally {
      setLoading(false);
    }
  };

  // handle user suspend
  const HandleUserSuspend = async ({ user }) => {
    setLoading(true);
    toast("suspending in process", {
      description: `suspending  user in progress`,
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const id = user.id;
      const data = {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        user_role: user.user_role,
        active: false,
      };
      const result = await SuspendUser({ id, data });
      const returnValueTrpe = typeof result === "object" ? false : true;
      if (returnValueTrpe === false) {
        toast(result.errorCode, {
          description: result.errorMessage,
          icon: <FileTerminal className=" text-destructive" />,
        });
        setLoading(false);
        return;
      }
      toast("User Suspended", {
        description: `user  has been suspended successfully`,
        icon: <CheckCheckIcon className=" text-success" />,
      });
      setLoading(false);
    } catch (error) {
      toast(error, {
        description: error.message,
        icon: <FileTerminal className=" text-destructive" />,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap pb-10 pt-5">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Users
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
            <Button variant="secondary">
              <AddUser lable="Add user" />
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
                <TableHead>Register by</TableHead>
                <TableHead>Register date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user?.id}>
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
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-muted-foreground">
                        {user?.phone_number}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{user?.creatAt}</TableCell>
                  <TableCell>{user?.created_at}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        user?.active === true ? "bg-primary" : "bg-destructive"
                      }`}
                    >
                      {user?.active === true ? "Active" : "Disabled"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user?.user_role}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className=" w-full"
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <EditUser user={user} />
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full">
                            <Button variant="outline" className="w-full">
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={(e) => HandleUserDelete(user.id)}
                              >
                                Delete user
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger
                            variant="outline"
                            className="w-full"
                          >
                            <Button variant="outline" className="w-full">
                              Suspend
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action can be reverse. This will suspend
                                this account and the user will notbe able to
                                login
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => HandleUserSuspend({ user })}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
            <TableFooter>
              <TableRow>{/* <UserPagination /> */}</TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
