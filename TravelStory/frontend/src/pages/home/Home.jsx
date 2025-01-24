import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import { data, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelStory from "./AddEditTravelStory";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allTravelStory, setAllTravelStory] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

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

  //Get all travel stories
  const getAllTravelStories = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await API.get("/travelStory/getAllStory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        ">>>>> All travel stories from Home page <<<<<",
        response.data.stories
      );

      setAllTravelStory(response.data.stories); // Set the state with the array if it's valid
    } catch (error) {
      console.log(error);
    }
  };

  //Update favorite stories
  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id;

    try {
      const token = localStorage.getItem("token");
      const response = await API.put(
        `/travelStory/updateIsFavoriteById/${storyId}`,
        { isFavorite: !storyData.isFavorite },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        ">>>>> Update favorite travel stories from Home page <<<<<",
        response.data
      );
      toast.success("Story updated successfully");
      getAllTravelStories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {};
  const handleViewStory = (data) => {};

  useEffect(() => {
    getAllTravelStories();
    getAllUsers();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allTravelStory.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 p-8">
                {allTravelStory.map((item) => {
                  return (
                    <TravelStoryCard
                      key={item._id}
                      imgUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavorite={item.isFavorite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavoriteClick={() => updateIsFavorite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No travel stories available.</p>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>

      {/* Add and Edit Travel Story Modal */}
      <Modal
        className="modal-box"
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      <button
        className="w-12 h-12 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <ToastContainer />
    </>
  );
};

export default Home;
