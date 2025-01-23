import React from "react";
import ProfileInfo from "./cards/ProfileInfo";
const Navbar = () => {
  return (
    <>
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
        <img
          src="https://st2.depositphotos.com/6203808/48792/v/450/depositphotos_487922512-stock-illustration-travel-often-badge-logo-travel.jpg"
          alt=""
          className="h-20"
        />
        <ProfileInfo/>
      </div>
    </>
  );
};

export default Navbar;
