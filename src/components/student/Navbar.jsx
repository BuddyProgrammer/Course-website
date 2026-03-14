import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);

  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="flex items-center gap-5 sm:gap-10">
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          {user && (
            <>
              <button className="cursor-pointer" onClick={() => navigate("/educator")}>
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>

              <span className="text-gray-400">|</span>

              <Link to="/my-enrollments" className="cursor-pointer">My Enrollments</Link>
            </>
          )}
        </div>

        {!user ? (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-800 text-white px-6 py-3 rounded-full cursor-pointer"
          >
            Create Account
          </button>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </div>
  );
};

export default Navbar;