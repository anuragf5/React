import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //Get all users
  const getAllUsers = async () => {
    try {
      const response = await API.get("/auth/getAllUsers");
      console.log(">>>>> All users from Home page <<<<<", response);

      if (response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Navbar />
      <TravelStoryCard/>
    </>
  );
};

export default Home;
