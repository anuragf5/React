import React, { useEffect, useState } from "react";
import API from "../../utils/api";

const TravelStoryCard = () => {
  const [allTravelStory, setAllTravelStory] = useState([]);

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

  useEffect(() => {
    getAllTravelStories();
  }, []);

  console.log("allTravelStory state:", allTravelStory);
  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allTravelStory.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 p-8">
                {allTravelStory.map((item) => (
                  <div key={item._id} className="border p-4 rounded-lg mb-4">
                    <img src={item.imageUrl} alt="" />
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-700">{item.story}</p>
                    <p>{item.visitedDate}</p>
                    <p>{item.visitedLocation}</p>
                    <p>{item.isFavorite}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No travel stories available.</p>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};

export default TravelStoryCard;
