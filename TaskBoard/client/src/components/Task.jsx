import React, { useState } from "react";
import API from "../api"; // Assuming you have an API instance for backend calls

const Task = ({ list, fetchLists }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [showInput, setShowInput] = useState(true);

  const addNewTask = async () => {
    if (!newTaskName) return;

    try {
      const { data } = await API.post("/tasks/create", {
        name: newTaskName,
        listId: list._id,
      });

      setNewTaskName(""); // Clear input field
      fetchLists(); // Re-fetch the list to show the newly added task
      localStorage.setItem("name", data.newTaskName);
    } catch (err) {
      console.log("Error creating task:", err);
    }
  };

  const handleCancel = () => {
    setShowInput(false); // Hide input box when cancel is clicked
    setNewTaskName(""); // Optionally clear the input field
  };

  return (
    <div>
      {showInput ? (
        <>
          <input
            style={{
              width: "100%",
              margin: "16px 10px 0px 0px",
              padding: "6px",
              border: "1px solid gainsboro",
              fontSize: "14px",
              borderRadius: "2px",
            }}
            type="text"
            placeholder="Enter task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "6px" }}
          >
            <button
              style={{
                padding: "8px",
                border: "none",
                fontFamily: "sans-serif",
                fontSize: "14px",
                backgroundColor: "#1D7AFC",
                color: "white",
                borderRadius: "4px",
                marginRight: "4px",
              }}
              onClick={addNewTask}
            >
              + Add
            </button>

            <button
              style={{
                padding: "8px",
                border: "none",
                fontFamily: "sans-serif",
                fontSize: "14px",
                backgroundColor: "transparent",
                // color: "white",
                borderRadius: "4px",
              }}
              onClick={handleCancel}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Task;
