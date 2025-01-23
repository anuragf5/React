import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { getInitials } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  //Get user by id
  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await API.get(`/auth/getById/${userId}`);

      console.log(">>>>> User Info by id on ProfileInfo page>>>>>", data);

      setName(data.name);
    } catch (err) {
      console.log("Error fetching user info:", err);
    }
  };

  //Removing token from local storage for logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, [navigate]);
  
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {name.charAt(0)}
        </div>
        <div className="">
          <p className="text-sm font-medium">{name || ""}</p>
          <button
            type="submit"
            className="text-sm text-slate-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
