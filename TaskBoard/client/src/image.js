import React, { useState, useEffect, useRef } from "react";
import API from "../api";
import Task from "./Task";
import Taskboard from "./TaskBoard";

const List = ({ list, fetchLists }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [bgColor, setBgColor] = useState(list.color || "white");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(false);
  const [file, setFile] = useState(null);
  const [attachCard, setAttachCard] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const getTasks = async () => {
    try {
      const { data } = await API.get(`/tasks/${list._id}`);
      setTasks(data);
      console.log("task data", data);
    } catch (err) {
      console.error(
        "Error fetching tasks:",
        err.response ? err.response.data : err.message
      );
    }
  };

  useEffect(() => {
    handleSave();
    getTasks();
  }, [list]);

  const handleDrop = async (ev, targetListId) => {
    ev.preventDefault();
    const taskId = ev.dataTransfer.getData("text");

    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      await API.put(`/tasks/update/${taskId}`, { listId: targetListId });

      fetchLists();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDragStart = (ev, taskId) => {
    ev.dataTransfer.setData("text", taskId); // Save the task ID in dataTransfer
  };

  const openDialog = (task) => {
    setSelectedTask(task);
    setIsDialogOpen(true);
    // Pre-populate the dates if they exist
    setStartDate(task.startDate || "");
    setDueDate(task.dueDate || "");
    setShowDates(true);
  };

  // Function to close the dialog box
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const toggleListDialog = () => {
    setIsListDialogOpen(!isListDialogOpen);
  };

  const handleFileChange = (event) => {
    event.stopPropagation();
    setFile(event.target.files[0]);
    console.log("file>>", event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // Assuming the task is selected
    if (selectedTask) {
      formData.append("listItem", JSON.stringify(selectedTask)); // Task info
    } else {
      alert("No task selected.");
      return;
    }

    // Assuming descItem is a description or metadata
    const descItem = "description"; // Replace with dynamic value
    formData.append("descItem", descItem);

    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/tasks/uploadFile", formData);

      if (response.status === 200) {
        alert("File uploaded successfully.");

        const uploadedImageUrl = response.data.imageurl;
        setImageUrl(uploadedImageUrl); // Store image URL

        // Add image to selected task's files array
        const updatedFiles = [
          ...selectedTask.files,
          { url: uploadedImageUrl, name: file.name, imgPosition: descItem },
        ];

        setSelectedTask((prevTask) => ({
          ...prevTask,
          files: updatedFiles,
        }));

        // Optionally refresh the task list
        fetchLists();
      } else {
        alert(response.data.message || "File upload failed.");
      }
    } catch (error) {
      alert("An error occurred while uploading the file.");
      console.error(error);
    }
  };


  return (
    <div
      style={{
        margin: "10px 10px 10px 16px",
        padding: "10px",
        border: "none",
        width: "300px",
        fontFamily: "sans-serif",
        backgroundColor: bgColor,
        borderRadius: "8px",
        height: "auto",
        position: "relative",
        border: "1px solid gainsboro",
      }}
      onDrop={(e) => handleDrop(e, list._id)}
      onDragOver={(e) => e.preventDefault()} // Allow dropping
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "20px",
              color: "#172B4D",
              // padding: "4px 0px 4px 0px",
            }}
          >
            {list.name}
          </p>
        </div>

        <div>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={toggleListDialog}
          ></i>
          {isListDialogOpen && (
            <div
              className="dialog"
              style={{
                position: "absolute",
                top: "33px",
                left: "150px",
                width: "150px",
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "4px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <button
                  style={{
                    width: "100%",
                    fontFamily: "sans-serif",
                    // backgroundColor: "transparent",
                    border: "1px solid white",
                    borderRadius: "4px",
                    padding: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    marginBottom: "2px",
                  }}
                  onClick={changeListColor}
                >
                  Label
                </button>
              </div>
              <div>
                <button
                  className="btnListDelete"
                  style={{
                    fontFamily: "sans-serif",
                    // backgroundColor: "transparent",
                    border: "1px solid white",
                    borderRadius: "4px",
                    padding: "4px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                  }}
                  onClick={() => handleDeleteList(list._id)}
                >
                  Delete List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        style={{
          fontSize: "16px",
          fontFamily: "sans-serif",
          border: "none",
          backgroundColor: "transparent",
          padding: "8px",
          borderRadius: "4px",
        }}
        onClick={() => setShowTaskInput(!showTaskInput)}
      >
        {/* {showTaskInput ? "Cancel" : "+ Add Task"} */}+ Add Task
      </button>
      {showTaskInput && (
        <Task list={list} fetchLists={fetchLists} getTasks={getTasks} />
      )}

      <div style={{ width: "100%" }}>
        {tasks.map((task) => (
          <div key={task._id} id={task._id}>
            <div
              style={{
                margin: "8px 0px 8px 0px",
                width: "100%",
              }}
              onClick={() => {
                openDialog(task);
              }}
            >
              <p
                key={task._id}
                id={task._id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, task._id)} // Trigger drag
                style={{
                  // margin: "8px 0px 8px 0px",
                  padding: "8px",
                  color: "black",
                  borderRadius: "5px",
                  border: "1px solid #C6C6C6",
                  // backgroundColor: "#FCFCFC",
                  backgroundColor: task.color || "white",
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  whiteSpace: "initial",
                  overflowWrap: "break-word",
                }}
              >
                {task.name}
              </p>
            </div>

            <div className="buttons_div">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  {/* Dialog box that is conditionally rendered */}
                  {isDialogOpen &&
                    selectedTask &&
                    selectedTask._id === task._id && (
                      <div
                        className="custom_dialog"
                        style={{
                          height: "80%",
                          width: "50%",
                          position: "fixed",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                          zIndex: "1000",
                          // overflow:"auto"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: task.color || "white",
                            borderRadius: "8px 8px 0px 0px",
                            borderBottom: "1px solid #c3c3c3",
                            height: "20%",
                          }}
                        >
                          <div></div>
                          <button
                            onClick={closeDialog}
                            style={{
                              padding: "6px 12px",
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <i
                              class="fa-solid fa-xmark"
                              style={{ fontSize: "24px", marginBottom: "48px" }}
                            ></i>
                          </button>
                        </div>

                        <div
                          style={{
                            width: "100%",
                            height: "80%",
                            borderRadius: "0px 0px 8px 8px",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="left" style={{ width: "75%" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "8px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "16px 0px 0px 16px",
                                }}
                              >
                                <div>
                                  <i
                                    class="fa-regular fa-credit-card"
                                    style={{ fontSize: "14px" }}
                                  ></i>
                                </div>
                                <p
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontSize: "14px",
                                    color: "black",
                                    margin: "8px 0px 0px 8px",
                                  }}
                                >
                                  {task.name}
                                </p>
                              </div>
                            </div>

                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <p
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "16px",
                                  marginLeft: "16px",
                                }}
                              >
                                in list
                              </p>
                              <p
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  marginLeft: "8px",
                                  backgroundColor: "#F2F2F2",
                                  padding: "6px",
                                  borderRadius: "6px",
                                  color: "#172B4D",
                                }}
                              >
                                {list.name}
                              </p>
                            </div>
                            {imageUrl && (
                              <div>
                                <h4>Uploaded Image:</h4>
                                <img
                                  src={imageUrl}
                                  alt="Uploaded"
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: "300px",
                                    objectFit: "contain",
                                    borderRadius: "8px",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          {/* <div className="right" style={{ width: "25%" }}>
                            <div>
                              <div
                                className="btn_attachments"
                                style={{
                                  backgroundColor: "#E1E1E1",
                                  padding: "6px",
                                  margin: "16px 8px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setAttachCard(!attachCard)}
                              >
                                <p
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontSize: "14px",
                                    textAlign: "center",
                                  }}
                                >
                                  Attachment
                                </p>
                              </div>
                            </div>
                          </div> */}
                          <div>
                            {attachCard && (
                              <div className="set-attachment">
                                <button
                                  className="cross-button"
                                  onClick={() => setAttachCard((prev) => !prev)}
                                >
                                  Submit
                                </button>

                                <h1 style={{ color: "black" }}>Attach</h1>
                                <form onSubmit={handleSubmit}>
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                  <button type="submit">Attach File</button>
                                </form>

                                {/* Display List of Files */}
                                <div>
                                  {selectedTask?.files?.map((file, index) => (
                                    <div key={index}>
                                      <a href={file.url} download>
                                        {file.name}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  {/* Background overlay when the dialog box is open */}
                  {isDialogOpen && (
                    <div
                      onClick={closeDialog}
                      style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: "999",
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
