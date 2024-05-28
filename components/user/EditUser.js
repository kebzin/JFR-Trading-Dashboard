"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UpdateUSerData,
  UpdateUser,
} from "@/libs/superbase/serverAction/userServerAction";
import { useState } from "react";
import { CheckCircle, FileTerminal, LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";

const EditUser = ({ user }) => {
  // satate
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone_number);
  const [loading, showLoading] = useState(false);
  const [userRole, setUserRole] = useState(user?.user_role);
  DialogClose;

  // hande form submits
  const handleSubmit = async (e) => {
    showLoading(true);
    toast("Processsing ", {
      description: `Processing your request `,
      icon: <LoaderIcon className="animate-spin text-pretty" />,
    });
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      user_role: userRole,
      // email: email,
      // address: address,
      // city: city,
    };

    // check if all properties are valid before sending
    if (!firstName || !lastName || !phone) {
      showLoading(false);
      return;
    }

    try {
      const id = user?.id;
      const result = await UpdateUSerData({ id, data });
      if (result === true) {
        showLoading(false);
        toast("Processing  successfully", {
          description: `Your request process  successfully`,
          icon: <CheckCircle className=" text-primary" />,
        });
        return;
      }
      // if the data return false it mean error
      else {
        showLoading(false);
        toast(result.errorMessage, {
          description: result.errorMessage,
          icon: <FileTerminal className="bg-destructive" />,
        });
        return;
      }
    } catch (error) {
    } finally {
      showLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User profile</DialogTitle>
          <DialogDescription>
            Make changes to user profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              First Name
            </Label>
            <Input
              id="first_name"
              placeholder="User first name"
              className="col-span-3"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Last Name
            </Label>
            <Input
              id="last_name"
              className="col-span-3"
              placeholder="User last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Phone number
            </Label>
            <Input
              id="phone"
              placeholder="Phone number"
              className="col-span-3"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Role" className="text-right">
              USer Role
            </Label>
            <Select
              onValueChange={(event) => {
                setUserRole(event);
              }}
            >
              <SelectTrigger
                className="w-full col-span-3"
                id="role"
                aria-label="Select role"
                value={userRole}
              >
                <SelectValue
                  className="w-full"
                  placeholder={user?.user_role}
                  value={userRole}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="b" value="Admin">
                  admin
                </SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={(e) => handleSubmit(e)} type="submit">
            {loading && <LoaderIcon className="animate-spin " />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditUser;
