import React, { useState } from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "../../components/input/DateSelector";
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";
import API from "../../utils/api";
import Moment from "moment";
import { toast } from "react-toastify";
import uploadImage from "../../utils/uploadImage";

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || null);
  const [visitedLocation, setVisitedLocation] = useState(
    storyInfo?.visitedLocation || []
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || null
  );

  const addNewTravelStory = async () => {
    try {
      const token = localStorage.getItem("token");
      let imageUrl = "";

      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await API.post(
        "/travelStory/addStory",
        {
          title,
          story,
          imageUrl: imageUrl || "",
          visitedLocation,
          visitedDate: visitedDate
            ? Moment(visitedDate).valueOf()
            : Moment().valueOf(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      toast.success("Story added successfully");
      getAllTravelStories();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTravelStory = async () => {
    const userId = storyInfo._id;
    try {
      const token = localStorage.getItem("token");
      let imageUrl = "";

      let postData = {
        title,
        story,
        imageUrl: storyInfo.imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate
          ? Moment(visitedDate).valueOf()
          : Moment().valueOf(),
      };

      if (typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";

        postData = {
          ...postData,
          imageUrl: imageUrl,
        };
      }

      const response = await API.post(
        `/travelStory/editStoryById/${userId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      toast.success("Story updated successfully");
      getAllTravelStories();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) {
      alert("Please enter the title");
      return;
    }

    if (!story) {
      alert("Please enter the story");
      return;
    }

    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

  const handleDeleteStoryImg = async () => {
    try {
      const token = localStorage.getItem("token");

      const deleteImageResponse = await API.delete(`/travelStory/deleteImages`, {
        params: {
          imageUrl: storyInfo.imageUrl,
        },
      });

      console.log(deleteImageResponse.data);

      if (deleteImageResponse.data) {
        const storyId = storyInfo._id;

        let postData = {
          title,
          story,
          imageUrl: "",
          visitedLocation,
          visitedDate: Moment().valueOf(),
        };

        const response = await API.post(
          `/travelStory/editStoryById/${storyId}`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStoryImg(null);
      }

      } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={addNewTravelStory}>
                <MdAdd className="text-lg" />
                ADD STORY
              </button>
            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" />
                  UPDATE STORY
                </button>

                <button className="btn-small btn-delete" onClick={onClose}>
                  <MdDeleteOutline className="text-lg" />
                  DELETE
                </button>
              </>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-scale-400" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label htmlFor="" className="input-label">
            Title
          </label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A Day at Pushkar Fair"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImage={handleDeleteStoryImg}
          />

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="" className="input-label">
              Story
            </label>
            <textarea
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              name=""
              id=""
              type="text"
              placeholder="Your story"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            ></textarea>
          </div>

          <div className="pt-3">
            <label htmlFor="" className="input-label">
              Visited Locations
            </label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
