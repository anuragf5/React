import React, { useState, useEffect, useRef } from "react";
import API from "../api";
import Task from "./Task";
import Taskboard from "./TaskBoard";

const List = ({ list, fetchLists }) => {
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [bgColor, setBgColor] = useState(list.color || "white");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showDates, setShowDates] = useState(false);

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

  const handleDelete = async (taskId) => {
    try {
      // Delete the task from the API
      await API.delete(`/tasks/deleteOneTask/${taskId}`);

      // Update the local state to remove the task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      closeDialog();
      // Optionally, you can call fetchLists to refresh the list of tasks globally
      fetchLists();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      // Delete the task from the API
      await API.delete(`/lists/deleteOneList/${listId}`);

      // Update the local state to remove the task
      setTasks((prevTasks) => prevTasks.filter((list) => list._id !== list));

      // Optionally, you can call fetchLists to refresh the list of tasks globally
      fetchLists();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const changeListColor = async () => {
    const colors = [
      "white",
      "#4BCE97",
      "#5FCD47",
      "#FEA362",
      "#F87168",
      "#9F8FEF",
    ];
    const currentColorIndex = colors.indexOf(bgColor);
    const nextColor = colors[(currentColorIndex + 1) % colors.length];
    setBgColor(nextColor);
    try {
      await API.put(`/lists/${list._id}/color`, { color: nextColor });
      // Refresh lists if needed
      fetchLists();
    } catch (err) {
      console.error("Error updating list color:", err);
    }
  };

  // const changeTaskColor = async () => {
  //   const colors = [
  //     "white",
  //     "#4BCE97",
  //     "#5FCD47",
  //     "#FEA362",
  //     "#F87168",
  //     "#9F8FEF",
  //   ];
  //   const currentColorIndex = colors.indexOf(bgColorTask);
  //   const nextColor = colors[(currentColorIndex + 1) % colors.length];
  //   setBgColorTask(nextColor);
  //   try {
  //     await API.put(`/tasks/${tasks._id}/color`, { color: nextColor });
  //     // Refresh lists if needed
  //     fetchLists();
  //   } catch (err) {
  //     console.error("Error updating list color:", err);
  //   }
  // };

  const changeTaskColor = async (taskId, currentColor) => {
    const colors = [
      "white",
      "#579DFF",
      "#6CC3E0",
      "#94C748",
      "#E774BB",
      "#8590A2",
    ];
    const currentColorIndex = colors.indexOf(currentColor);
    const nextColor = colors[(currentColorIndex + 1) % colors.length];

    try {
      // Update color in the backend
      await API.put(`/tasks/${taskId}/color`, { color: nextColor });

      // Update the color locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, color: nextColor } : task
        )
      );
    } catch (err) {
      console.error("Error updating task color:", err);
    }
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

  const toggleMapView = () => {
    setMapView(true);
  };

  const handleCloseMap = () => {
    setMapView(false); // Hide the map when the close button is clicked
  };

  // Handle opening the dialog when the "Dates" div is clicked
  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  // Handle closing the dialog
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSave = async () => {
    if (!selectedTask) return;

    try {
      // Update start date if it's provided
      if (startDate) {
        const response = await API.post("/tasks/startDate", {
          taskId: selectedTask._id,
          startDate,
        });
        console.log(">>>>> Start date updated <<<<<", response.data);
      }

      // Update due date if it's provided
      if (dueDate) {
        const response = await API.post("/tasks/dueDate", {
          taskId: selectedTask._id,
          dueDate,
        });
        console.log(">>>>> Due date updated <<<<<", response.data);
      }

      // After successfully saving, update local tasks state
      setTasks(
        tasks.map((task) =>
          task._id === selectedTask._id ? { ...task, startDate, dueDate } : task
        )
      );
      handleCloseDialog(); // Close the date dialog after saving
      setStartDate("");
      setDueDate("");
      setShowDates(true);
    } catch (error) {
      console.error("Error updating task:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Network or other error:", error.message);
      }
    }
  };

  const formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(date);
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate());

    return `${month} ${day}`;
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

                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "16px 0px 0px 16px",
                                }}
                              >
                                <div>
                                  <i
                                    class="fa-solid fa-calendar-days"
                                    style={{ fontSize: "14px" }}
                                  ></i>
                                </div>
                                <p
                                  style={{
                                    fontFamily: "sans-serif",
                                    fontSize: "14px",
                                    margin: "8px 0px 0px 8px",
                                  }}
                                >
                                  Dates
                                </p>
                              </div>

                              {showDates ? (
                                <div>
                                  {selectedTask._id &&
                                    selectedTask._id === task._id && (
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontFamily: "sans-serif",
                                            fontSize: "16px",
                                            backgroundColor: "#F2F2F2",
                                            padding: "8px",
                                            marginLeft: "16px",
                                            marginTop: "8px",
                                            borderRadius: "6px",
                                            color: "#172B4D",
                                          }}
                                        >
                                          {formatDate(task.startDate)}
                                        </p>
                                        <div
                                          style={{
                                            border: "1px solid black",
                                            height: "1px",
                                            width: "10px",
                                            marginTop: "8px",
                                            marginLeft: "8px",
                                          }}
                                        ></div>
                                        <p
                                          style={{
                                            fontFamily: "sans-serif",
                                            fontSize: "16px",
                                            marginLeft: "8px",
                                            backgroundColor: "#F2F2F2",
                                            padding: "8px",
                                            marginTop: "8px",
                                            borderRadius: "6px",
                                            color: "#172B4D",
                                          }}
                                        >
                                          {formatDate(task.dueDate)}
                                        </p>
                                      </div>
                                    )}{" "}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div>
                              {mapView && (
                                <div>
                                  <div
                                    className="location"
                                    style={{
                                      padding: "16px",
                                      position: "relative",
                                    }}
                                  >
                                    <iframe
                                      src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d56923.38019988756!2d75.74589936743743!3d26.91265722877532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!3m2!1d26.9124336!2d75.7872709!4m5!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!3m2!1d26.9124336!2d75.7872709!5e0!3m2!1sen!2sin!4v1735246306305!5m2!1sen!2sin"
                                      width="100%"
                                      height={200}
                                      allowFullScreen=""
                                      loading="lazy"
                                      referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                    {/* Close Button */}
                                    <button
                                      onClick={handleCloseMap}
                                      style={{
                                        position: "absolute",
                                        top: "24px",
                                        right: "24px",
                                        backgroundColor: "#F9F9F9",
                                        color: "black",
                                        border: "none",
                                        padding: "4px 8px",
                                        cursor: "pointer",
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <i
                                        class="fa-solid fa-xmark"
                                        style={{ fontSize: "16px" }}
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="right" style={{ width: "25%" }}>
                            <div
                              className="dates"
                              style={{
                                backgroundColor: "#E1E1E1",
                                padding: "6px",
                                margin: "16px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              <p
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                                onClick={() =>
                                  changeTaskColor(task._id, task.color)
                                }
                              >
                                Label
                              </p>
                            </div>
                            <div
                              className="dates"
                              style={{
                                backgroundColor: "#E1E1E1",
                                padding: "6px",
                                margin: "16px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              onClick={handleOpenDialog}
                            >
                              <p
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                              >
                                Dates
                              </p>
                            </div>
                            {showDialog &&
                              selectedTask._id &&
                              selectedTask._id === task._id && (
                                <div
                                  className="dialog"
                                  style={{
                                    width: "200px",
                                    position: "fixed",
                                    top: "45%",
                                    left: "50%",
                                    transform: "translate(-10%, -50%)",
                                    backgroundColor: "white",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    zIndex: 1000,
                                  }}
                                >
                                  <div>
                                    <p
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontSize: "16px",
                                      }}
                                    >
                                      Start Date:
                                    </p>
                                    <input
                                      style={{
                                        fontFamily: "sans-serif",
                                        width: "100%",
                                      }}
                                      type="date"
                                      value={startDate}
                                      onChange={(e) =>
                                        setStartDate(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div style={{ marginTop: "8px" }}>
                                    <p
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontSize: "16px",
                                      }}
                                    >
                                      End Date:{" "}
                                    </p>
                                    <input
                                      style={{
                                        fontFamily: "sans-serif",
                                        width: "100%",
                                      }}
                                      type="date"
                                      value={dueDate}
                                      onChange={(e) =>
                                        setDueDate(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div
                                    style={{ marginTop: "16px", width: "100%" }}
                                  >
                                    <button
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontSize: "14px",
                                        width: "45%",
                                        padding: "4px",
                                        marginRight: "10%",
                                      }}
                                      onClick={handleSave}
                                    >
                                      Save
                                    </button>
                                    <button
                                      style={{
                                        fontFamily: "sans-serif",
                                        fontSize: "14px",
                                        width: "45%",
                                        padding: "4px",
                                      }}
                                      onClick={handleCloseDialog}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            {/* <div>
                              <div
                                className="btn_attachments"
                                style={{
                                  backgroundColor: "#E1E1E1",
                                  padding: "6px",
                                  margin: "16px 8px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
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
                            </div> */}
                            <div
                              className="btn_attachments"
                              style={{
                                backgroundColor: "#E1E1E1",
                                padding: "6px",
                                margin: "16px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              onClick={toggleMapView}
                            >
                              <p
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                              >
                                Location
                              </p>
                            </div>
                            <div
                              className="btn_attachments"
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "6px",
                                margin: "16px 8px",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleDelete(task._id)}
                            >
                              <p
                                style={{
                                  fontFamily: "sans-serif",
                                  fontSize: "14px",
                                  textAlign: "center",
                                }}
                              >
                                Delete Task
                              </p>
                            </div>
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
