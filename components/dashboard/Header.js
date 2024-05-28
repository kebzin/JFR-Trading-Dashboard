// import { useContext, useState } from "react";
// import SidebarContext from "context/SidebarContext";
import { Button } from "../ui/button";
import { BellIcon, MenuIcon, MoonIcon, SearchIcon } from "lucide-react";
import { Avatar } from "../ui/avatar";

function Header() {
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <Button
          // className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          // onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </Button>
        {/* <!-- Search input --> */}

        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}

          <MoonIcon className="w-5 h-5" />

          {/* <!-- Notifications menu --> */}

          <BellIcon className="w-5 h-5" aria-hidden="true" />
          {/* <!-- Notification badge --> */}

          {/* <!-- Profile menu --> */}

          <Avatar
            className="align-middle"
            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
            alt=""
            aria-hidden="true"
          />
        </ul>
      </div>
    </header>
  );
}

export default Header;
