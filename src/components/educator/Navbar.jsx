import React from "react";
import { Link } from "react-router-dom";
import { assets, dummyEducatorData } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {

  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3">

      {/* LOGO */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="w-28 lg:w-32"
        />
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5 text-gray-600">

        <p>Hi! {user ? user.fullName : "Developer"}</p>

        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <img
            className="w-8 h-8 rounded-full"
            src={assets.profile_img}
            alt="profile"
          />
        )}

      </div>

    </div>
  );
};

export default Navbar;