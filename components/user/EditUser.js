"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpdateUser } from "@/libs/superbase/serverAction/userServerAction";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";

const EditUser = ({ user }) => {
  // satate
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone_number);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [loading, showLoading] = useState(false);

  // hande form submits
  const handleSubmit = async (e) => {
    showLoading(true);
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      // email: email,
      // address: address,
      // city: city,
    };

    try {
      const id = user?.id;
      const result = await UpdateUser({ id, data });
      console.log(result);
      showLoading(false);
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
