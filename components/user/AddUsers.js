"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  UserPlus2,
  LoaderIcon,
  FileTerminal,
  CheckCheckIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import { AddNewUser } from "@/libs/superbase/serverAction/userServerAction";
import { toast } from "sonner";

const AddUsers = ({ lable }) => {
  // states
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // handle user added
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      password: password,
      user_role: role,
    };
    console.log(data);
    toast("Adding in process", {
      description: `Adding new ${data.user_role} user in progress`,
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    try {
      const result = await AddNewUser({ data });
      const returnValueTrpe = typeof result === "object" ? false : true;

      if (returnValueTrpe === false) {
        toast(result.errorCode, {
          description: result.errorMessage,
          icon: <FileTerminal className=" text-destructive" />,
        });
        setIsLoading(false);
        return;
      }
      // success

      toast("User addes", {
        description: `New ${data.user_role} has been added successfully`,
        icon: <CheckCheckIcon className=" text-success" />,
      });
      setIsLoading(false);
    } catch (error) {
      toast(error, {
        description: error.message,
        icon: <FileTerminal className=" text-destructive" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="gap-3" variant="secondary">
          <UserPlus2 /> {lable}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="mx-auto max-w-sm bg-transparent">
          <CardHeader>
            <CardTitle className="text-xl">Add a new user</CardTitle>
            <CardDescription>
              Enter the user information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Enter first name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Enter last name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Phone Number</Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="2493268"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">User role</Label>
                <Select value={role} onValueChange={(e) => setRole(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user rolle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="Administrator">
                        Administrator
                      </SelectItem>
                      <SelectItem value="Marketting">Marketting</SelectItem>
                      <SelectItem value="Driver">Driver</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                />
              </div>
              <Button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="w-full text-white "
              >
                {isLoading && <LoaderIcon className="animate-spin " />}
                <UserPlus2 />
                Add new user
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AddUsers;
