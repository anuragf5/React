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
  const [title, setTitle] = useState("");
  const [storyImg, setStoryImg] = useState(null);
  const [story, setStory] = useState(null);
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [visitedDate, setVisitedDate] = useState(null);
  const [error, setError] = useState("");

  const updateTravelStory = async () => {};

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

  const handleDeleteStoryImg = async () => {};

  return (
    <div>
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
