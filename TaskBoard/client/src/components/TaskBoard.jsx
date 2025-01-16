import React, { useState, useEffect } from "react";
import API from "./../api";
import List from "./List";
import { Link, useNavigate } from "react-router-dom";
import Map from "./Map";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  scales,
  Ticks,
  Colors,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
const localizer = momentLocalizer(moment);

const Taskboard = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const name = location.state?.name || localStorage.getItem("name");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [expireDays, setExpireDays] = useState(true);
  const [diffInDays, setRemainingTime] = useState(null);
  const [boardView, setBoardView] = useState(true);
  const [tableView, setTableView] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showCalendar, setCalendarView] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isNavDropdownOpen, setNavDropdownOpen] = useState(false);
  const [referredUsers, setReferredUsers] = useState([]);
  const [referralCode, setReferralCode] = useState("");

  const navigate = useNavigate();

  const fetchLists = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const { data } = await API.get(`/lists/${userId}`);

      console.log(">>>>> List data <<<<<", data);

      // Assuming each list in the data contains tasks
      const listsWithTasks = await Promise.all(
        data.map(async (list) => {
          const tasks = await API.get(`/tasks/${list._id}`); // Fetch tasks for this list
          return { ...list, tasks: tasks.data }; // Add tasks to the list object
        })
      );

      setLists(listsWithTasks); // Update the state with lists containing tasks

      console.log("Lists with tasks", listsWithTasks);

      // setLists(data);
    } catch (err) {
      console.log("Error fetching lists:", err);
    }
  };

  const addNewList = async () => {
    const userId = localStorage.getItem("userId");
    if (!newListName) return;

    // Create a temporary list to show it immediately in the UI
    const newList = {
      _id: userId, // Generate a unique ID temporarily (will be replaced with real ID from backend)
      name: newListName,
      tasks: [], // Initial empty tasks array
    };

    // Optimistically update the state with the new list
    setLists((prevLists) => [...prevLists, newList]);
    setNewListName("");
    setShowInput(false);

    try {
      // Persist the new list to the backend
      const { data } = await API.post("/lists/create", {
        name: newListName,
        userId,
      });

      // Update the list with the correct ID from the backend
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === newList._id ? { ...list, _id: data._id } : list
        )
      );
    } catch (err) {
      console.log("Error creating list:", err);
      // If the API call fails, revert the changes
      setLists((prevLists) =>
        prevLists.filter((list) => list._id !== newList._id)
      );
    }
  };

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await API.get(`/auth/getById/${userId}`);

      console.log(">>>>> User Info >>>>>", data);

      setEmail(data.email); // Set email from backend response
      setName(data.name);
      setExpireDays(data.remainingDays);
      setReferralCode(data.referralCode);
    } catch (err) {
      console.log("Error fetching user info:", err);
    }
  };

  const handleEditClick = () => {
    setEditMode(true); // Enable edit mode when user clicks 'Edit account info'
  };

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await API.put(`/auth/update/${userId}`, {
        name: name,
        email: email,
      });
      console.log(">>>>> Updated user <<<<<", data);

      alert("User account update successfully"); // Notify user that their info was updated
      setEditMode(false); // Disable edit mode after saving
    } catch (err) {
      console.log("Error saving account info:", err);
    }
  };

  const purchasePlan = () => {
    navigate("/purchasePlan");
  };

  const toggleBoardView = () => {
    fetchLists();
    setBoardView(true);
    setTableView(false);
    setShowChart(false);
    setCalendarView(false);
    setMapView(false);
  };

  const toggleTableView = () => {
    fetchLists();
    setTableView(true);
    setBoardView(false);
    setShowChart(false);
    setCalendarView(false);
    setMapView(false);
  };

  const toggleChartView = () => {
    fetchLists();
    setShowChart(true);
    setBoardView(false);
    setTableView(false);
    setCalendarView(false);
    setMapView(false);
  };

  const toggleCalendarView = () => {
    fetchLists();
    setCalendarView(true);
    setBoardView(false);
    setTableView(false);
    setShowChart(false);
    setMapView(false);
  };

  const toggleMapView = () => {
    fetchLists();
    setMapView(true);
    setCalendarView(false);
    setBoardView(false);
    setTableView(false);
    setShowChart(false);
  };

  const toggleTemplateView = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const templates = [
    "https://plus.unsplash.com/premium_photo-1661963745503-8b3a86b8c2b1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1473800447596-01729482b8eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1503389152951-9f343605f61e?q=80&w=1799&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleImageClick = (imageUrl) => {
    // Set the background for the page
    document.body.style.backgroundImage = `url(${imageUrl})`;

    // Save the selected image in localStorage
    localStorage.setItem("backgroundImage", imageUrl);
    setBackgroundImage(imageUrl);
  };

  const handleDefaultClick = () => {
    document.body.style.backgroundImage = "none"; // Remove background image
    document.body.style.backgroundColor = "white"; // Set background color to white

    // Remove the saved background image from localStorage
    localStorage.removeItem("backgroundImage");
    setBackgroundImage(""); // Clear the state
  };

  const [visibleItems, setVisibleItems] = useState({
    board: true,
    table: true,
    chart: true,
    calendar: true,
    map: true,
  });

  const toggleNavListView = () => {
    setNavDropdownOpen(!isNavDropdownOpen);
  };

  const handleCheckboxChange = (item) => {
    setVisibleItems((prevState) => {
      const updatedItems = { ...prevState, [item]: !prevState[item] };
      // Save the updated visibility state to localStorage
      localStorage.setItem("visibleItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const getChartData = () => {
    const listNames = lists.map((list) => list.name);
    const taskCounts = lists.map((list) => list.tasks.length); // Count tasks for each list

    return {
      labels: listNames,
      datasets: [
        {
          label: "Tasks per List",
          data: taskCounts,
          borderWidth: 1,
          backgroundColor: "rgba(75, 192, 192)",
        },
      ],
    };
  };

  // Prepare chart data for the Pie chart (Assuming tasks have due dates)
  const getPieChartData = () => {
    const dueDateList = lists.flatMap((list) =>
      list.tasks.filter((task) => task.dueDate)
    );
    const noDueDateList = lists.flatMap((list) =>
      list.tasks.filter((task) => !task.dueDate)
    );

    return {
      labels: ["Due Date", "No Due Date"],
      datasets: [
        {
          data: [dueDateList.length, noDueDateList.length],
          backgroundColor: ["#e2483d", "#454f59"], // Red and Gray for different categories
        },
      ],
    };
  };

  const logout = () => {
    localStorage.removeItem("token"); // or sessionStorage.removeItem("token") or delete a cookie
    navigate("/login");
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
    const year = String(d.getFullYear());

    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    // Retrieve the email from localStorage
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail); // Set the email in the state
    }

    const name = localStorage.getItem("name");
    if (name) {
      setName(name);
    }
  }, [navigate]);

  useEffect(() => {
    fetchLists();
    fetchUserInfo();
    const savedBackgroundImage = localStorage.getItem("backgroundImage");
    if (savedBackgroundImage) {
      // Set the background using the saved image URL
      document.body.style.backgroundImage = `url(${savedBackgroundImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      setBackgroundImage(savedBackgroundImage);
    } else {
      document.body.style.backgroundColor = "white";
    }

    const savedVisibility = localStorage.getItem("visibleItems");
    if (savedVisibility) {
      setVisibleItems(JSON.parse(savedVisibility));
    }
  }, []);

  const events = lists.flatMap((list) =>
    list.tasks.map((task) => ({
      title: task.name, // Task name as the event title
      start: new Date(task.startDate), // Use task start date
      end: new Date(task.dueDate), // Use task due date
    }))
  );

  const handleReferralFetch = async () => {
    try {
      // Replace 'email' and 'referralCode' with the actual values from the logged-in user
      const response = await API.post(`/settings/getReferredUsers`, {
        email: email,
        referralCode: referralCode,
      });

      // Set the referred users from the API response
      setReferredUsers(response.data.referredUsers[0].referredUsers);
      console.log(
        "response.data.referredUsers",
        response.data.referredUsers[0].referredUsers
      );
    } catch (err) {
      alert("Failed to fetch referred users");
      console.error(err);
    }
  };

  useEffect(() => {
    // handleReferralFetch();
  }, []);

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/settings/sendReferral`, {
        email,
        referralCode,
      });
      console.log("userDetail.referralCode", referralCode);
      alert("Email send Successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Please try again.");
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav
        style={{
          width: "100%",
          padding: "22px 16px 22px 16px",
          backgroundColor: "#084793",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: "100",
          position: "fixed",
          borderBottom: ".5px solid #C6C6C6",
          top: "0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: "225px", display: "flex", alignItems: "center" }}
          >
            <div>
              <i
                className="fa-brands fa-delicious"
                style={{ color: "white", marginRight: "8px" }}
              ></i>
            </div>
            <h1 style={{ fontFamily: "sans-serif", color: "white" }}>
              TaskBoard
            </h1>
          </div>

          {visibleItems.board && (
            <div
              className="board"
              style={{
                display: "flex",
                alignItems: "center",
                // marginLeft: "96px",
                padding: "8px",
              }}
              onClick={toggleBoardView}
            >
              <div>
                <i
                  className="fa-solid fa-newspaper"
                  style={{ color: "white" }}
                ></i>
              </div>
              <div>
                <p
                  className="btn_table"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Board
                </p>
              </div>
            </div>
          )}

          {visibleItems.table && (
            <div
              className="table"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "24px",
                padding: "8px",
              }}
              onClick={toggleTableView}
            >
              <div>
                <i className="fa-solid fa-table" style={{ color: "white" }}></i>
              </div>
              <div>
                <p
                  className="btn_table"
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Table
                </p>
              </div>
            </div>
          )}

          {visibleItems.chart && (
            <div
              className="chart"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "24px",
                padding: "8px",
              }}
              onClick={toggleChartView}
            >
              <div>
                <i
                  className="fa-solid fa-chart-simple"
                  style={{ color: "white" }}
                ></i>
              </div>
              <div>
                <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Chart
                </p>
              </div>
            </div>
          )}

          {visibleItems.calendar && (
            <div
              className="chart"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "24px",
                padding: "8px",
              }}
              onClick={toggleCalendarView}
            >
              <div>
                <i
                  className="fa-solid fa-calendar-days"
                  style={{ color: "white" }}
                ></i>
              </div>
              <div>
                <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Calendar
                </p>
              </div>
            </div>
          )}

          {visibleItems.map && (
            <div
              className="chart"
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "24px",
                padding: "8px",
              }}
              onClick={toggleMapView}
            >
              <div>
                <i className="fa-solid fa-map" style={{ color: "white" }}></i>
              </div>
              <div>
                <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Map
                </p>
              </div>
            </div>
          )}

          {/* <div
            className="board"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "96px",
              padding: "8px",
            }}
            onClick={toggleBoardView}
          >
            <div>
              <i class="fa-solid fa-newspaper" style={{ color: "white" }}></i>
            </div>
            <div>
              <p
                className="btn_table"
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Board
              </p>
            </div>
          </div> */}

          {/* <div
            className="table"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "24px",
              padding: "8px",
            }}
            onClick={toggleTableView}
          >
            <div>
              <i class="fa-solid fa-table" style={{ color: "white" }}></i>
            </div>
            <div>
              <p
                className="btn_table"
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Table
              </p>
            </div>
          </div> */}

          {/* <div
            className="chart"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "24px",
              padding: "8px",
            }}
            onClick={toggleChartView}
          >
            <div>
              <i
                class="fa-solid fa-chart-simple"
                style={{ color: "white" }}
              ></i>
            </div>
            <div>
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Chart
              </p>
            </div>
          </div> */}
          {/* <div
            className="chart"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "24px",
              padding: "8px",
            }}
            onClick={toggleCalendarView}
          >
            <div>
              <i
                class="fa-solid fa-calendar-days"
                style={{ color: "white" }}
              ></i>
            </div>
            <div>
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                Calendar
              </p>
            </div>
          </div> */}
          <div
            className="chart"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "24px",
              padding: "8px",
            }}
            onClick={toggleTemplateView}
          >
            <div>
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "8px",
                }}
              >
                Templates
              </p>
            </div>
            <div>
              <i
                class="fa-solid fa-chevron-down"
                style={{ color: "white" }}
              ></i>
            </div>

            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "8px",
                  marginTop: "18px",
                  // color: "white",
                  top: "60px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                {templates.map((imageUrl, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <img
                      src={imageUrl}
                      alt={`Template ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "50px",
                        cursor: "pointer",
                        borderRadius: "4px",
                      }}
                      onClick={() => handleImageClick(imageUrl)}
                    />
                  </div>
                ))}
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontFamily: "sans-serif",
                      fontWeight: "bold",
                      padding: "8px",
                      borderRadius: "4px",
                      textAlign: "center",
                      backgroundColor: "#F2F2F2",
                    }}
                    onClick={handleDefaultClick}
                  >
                    Default
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              // padding: "8px",
              position: "relative",
            }}
          >
            <div
              className="nav_list_names"
              style={{
                marginLeft: "24px",
                backgroundColor: "white",
                padding: "8px",
                borderRadius: "4px",
              }}
              onClick={toggleNavListView}
            >
              <i
                class="fa-solid fa-chevron-down"
                style={{ color: "black" }}
              ></i>
            </div>
            {isNavDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "8px",
                  marginTop: "18px",
                  // color: "white",
                  top: "40px",
                  left: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  width: "300px",
                }}
              >
                {/* Checkboxes for toggling visibility */}
                {["board", "table", "chart", "calendar", "map"].map((item) => {
                  // Icon selection based on the item
                  const icons = {
                    board: "fa-newspaper",
                    table: "fa-table",
                    chart: "fa-chart-simple",
                    calendar: "fa-calendar-days",
                    map: "fa-solid fa-map",
                  };

                  return (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                      }}
                    >
                      {/* Icon next to the checkbox */}
                      <input
                        type="checkbox"
                        checked={visibleItems[item]}
                        onChange={() => handleCheckboxChange(item)}
                        style={{ marginRight: "16px" }}
                      />

                      <div
                        className="check_items"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          padding: "8px",
                        }}
                      >
                        <div>
                          <i
                            className={`fa-solid ${icons[item]}`}
                            style={{
                              marginRight: "8px",
                              color: "black", // Icon color
                            }}
                          ></i>
                        </div>
                        <div>
                          <label
                            style={{
                              fontSize: "14px",
                              fontFamily: "sans-serif",
                            }}
                          >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Right */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div onClick={purchasePlan}>
            <p
              style={{
                color: "white",
                marginRight: "24px",
                fontSize: "16px",
                fontFamily: "sans-serif",
                border: "none",
                padding: "6px",
                borderRadius: "4px",
                backgroundColor: "#0055CC",
              }}
            >
              {expireDays} Days Left
            </p>
          </div>
          <div className="searchBar">
            <form action="" onSubmit={handleShare}>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter email to share code"
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  marginRight: "24px",
                  border: "1px solid black",
                  borderRadius: "2px",
                  padding: "6px",
                }}
              />
              <button
                type="submit"
                style={{
                  fontSize: "14px",
                  fontFamily: "sans-serif",
                  padding: "7px 12px 7px 12px",
                  border: "none",
                  backgroundColor: "#0055CC",
                  color: "white",
                }}
              >
                Share
              </button>
            </form>
          </div>

          {/* <div
            className="searchBar"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0055CC",
              marginRight: "24px",
              padding: "6px",
              borderRadius: "4px",
            }}
          >
            <div>
              <i
                class="fa-solid fa-share-nodes"
                style={{ color: "white", marginRight: "8px" }}
              ></i>
            </div>
            <p
              style={{
                color: "white",
                fontSize: "16px",
                fontFamily: "sans-serif",
                border: "none",
                // backgroundColor: "#0055CC",
              }}
            >
              Share
            </p>
          </div> */}
          <button
            style={{
              padding: "6px 12px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#E56910",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginLeft: "24px",
            }}
            onClick={() => setIsSidebarOpen(true)}
          >
            {name.charAt(0)}
          </button>
        </div>
      </nav>
      {/* Left Side Navigation Bar */}
      <div
        style={{
          position: "fixed",
          top: "78px",
          left: isLeftSidebarOpen ? "0" : "-230px", // Slide in/out effect
          width: "250px",
          height: "100%",
          backgroundColor: "#0055CC",
          color: "#E0DDD5",
          // overflowX: "hidden",
          transition: "left 0.3s ease",
          padding: "20px",
          zIndex: "90",
          borderTop: ".5px solid #C6C6C6",
          borderRight: ".5px solid #C6C6C6",
        }}
      >
        <button
          style={{
            // padding: "6px",
            height: "30px",
            width: "30px",
            marginBottom: "24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#084793",
            color: "white",
            border: "none",
            borderRadius: "50%",
            position: "absolute",
            right: "-15px",
          }}
          onClick={() => setIsLeftSidebarOpen((open) => !open)}
        >
          {isLeftSidebarOpen ? (
            <i style={{ color: "white" }} class="fa-solid fa-chevron-left"></i>
          ) : (
            <i style={{ color: "white" }} class="fa-solid fa-chevron-right"></i>
          )}
        </button>
        <div
          className="leftNavHover"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "24px",
            padding: "6px",
            borderRadius: "4px",
          }}
          onClick={toggleBoardView}
        >
          <i
            class="fa-solid fa-newspaper"
            style={{ color: "white", marginRight: "16px" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Boards
          </p>
        </div>

        <div
          className="leftNavHover"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "24px",
            padding: "6px",
            borderRadius: "4px",
          }}
          onClick={toggleChartView}
        >
          <i
            class="fa-solid fa-users"
            style={{ color: "white", marginRight: "16px" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Chart
          </p>
        </div>

        <div
          className="leftNavHover"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "24px 0px 24px 0px",
            padding: "6px",
            borderRadius: "4px",
          }}
          onClick={toggleMapView}
        >
          <i
            class="fa-solid fa-toolbox"
            style={{ color: "white", marginRight: "16px" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Map
          </p>
        </div>

        <div
          className="leftNavHover"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "24px 0px 0px 0px",
            padding: "6px",
            borderRadius: "4px",
          }}
          onClick={toggleTableView}
        >
          <i
            class="fa-solid fa-newspaper"
            style={{ color: "white", marginRight: "16px" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Table
          </p>
        </div>

        <div
          className="leftNavHover"
          style={{
            display: "flex",
            alignItems: "center",
            margin: "24px 0px 24px 0px",
            padding: "6px",
            borderRadius: "4px",
          }}
          onClick={toggleCalendarView}
        >
          <i
            class="fa-regular fa-calendar-days"
            style={{ color: "white", marginRight: "16px" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Calendar
          </p>
        </div>

        <hr />

        <p
          style={{
            fontFamily: "sans-serif",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            marginTop: "24px",
            cursor: "pointer",
            padding: "6px",
          }}
        >
          Your Boards
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "24px 0px 0px 0px",
            padding: "6px",
          }}
        >
          <i
            class="fa-solid fa-crop-simple"
            style={{ color: "white", marginRight: "16px" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Design
          </p>
        </div>
      </div>
      {/* Right Side Navigation Bar */}
      <div
        style={{
          position: "fixed",
          top: "78px",
          right: isSidebarOpen ? "0" : "-300px", // Slide in/out effect
          width: "300px",
          // height: "100%",
          backgroundColor: "white",
          color: "#E0DDD5",
          // overflowX: "hidden",
          transition: "top 0.8s ease",
          padding: "20px",
          // borderLeft: ".5px solid #C6C6C6",
          // borderTop: ".5px solid #C6C6C6",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: "100",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div></div>
          <i
            className="fa-solid fa-xmark"
            style={{
              fontSize: "16px",
              padding: "4px",
              color: "black",
            }}
            onClick={() => setIsSidebarOpen(false)}
          ></i>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "32px",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "sans-serif",
                color: "black",
              }}
            >
              ACCOUNT
            </h2>
          </div>
          <div
            style={{
              border: "1px solid black",
              padding: "4px",
              borderRadius: "4px",
            }}
            onClick={handleEditClick}
          >
            <i className="fa-solid fa-pen" style={{ color: "black" }}></i>
          </div>
        </div>

        {editMode ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "8px",
                fontSize: "16px",
                fontFamily: "sans-serif",
                border: "1px solid #C6C6C6",
                borderRadius: "2px",
                backgroundColor: "white",
              }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
              // disabled
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
                fontSize: "16px",
                fontFamily: "sans-serif",
                border: "1px solid #C6C6C6",
                borderRadius: "2px",
                backgroundColor: "white",
              }}
            />
            <button
              className="btn_save_edit_profile"
              onClick={handleSaveChanges}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "hsla(215, 90%, 37.7%, 0.9)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "14px",
                marginBottom: "16px",
              }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <i className="fa-solid fa-user" style={{ color: "black" }}></i>
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  color: "black",
                  marginLeft: "16px",
                }}
              >
                {name}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <i
                className="fa-solid fa-envelope"
                style={{ color: "black" }}
              ></i>
              <p
                style={{
                  fontFamily: "sans-serif",
                  color: "black",
                  fontSize: "14px",
                  marginLeft: "16px",
                }}
              >
                {email}
              </p>
            </div>
          </>
        )}

        <div className="comment">
          {/* <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "14px",
            marginBottom: "8px",
            color: "#172B4D",
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: "sans-serif",
            color: "#172B4D",
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          {email}
        </p>
        <hr />
        <p
          style={{
            fontFamily: "sans-serif",
            color: "#172B4D",
            fontSize: "14px",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          Edit account info
        </p> */}

          {/* {editMode ? (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name"
              style={{ marginBottom: "12px", width: "100%" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
              style={{ marginBottom: "12px", width: "100%" }}
            />
            <button
              onClick={handleSaveChanges}
              style={{
                padding: "8px 16px",
                backgroundColor: "#084793",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Save Changes
            </button>
          </div>
        ) : (
          <>
            <p
              style={{
                fontFamily: "sans-serif",
                fontSize: "14px",
                marginBottom: "8px",
                color: "#172B4D",
              }}
            >
              {name}
            </p>
            <p
              style={{
                fontFamily: "sans-serif",
                color: "#172B4D",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              {email}
            </p>
            <button
              onClick={handleEditClick}
              style={{
                fontFamily: "sans-serif",
                fontSize: "14px",
                padding: "8px 16px",
                backgroundColor: "hsla(215, 90%, 37.7%, 0.9)",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Edit account info
            </button>
          </>
        )} */}
        </div>

        <hr />

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "24px" }}
        >
          <i
            className="fa-solid fa-right-from-bracket"
            style={{ color: "black" }}
          ></i>
          <p
            style={{
              fontFamily: "sans-serif",
              color: "black",
              fontSize: "14px",
              cursor: "pointer",
              marginLeft: "16px",
            }}
            onClick={logout}
          >
            Logout
          </p>
        </div>
      </div>
      {boardView ? (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              fontSize: "24px",
              marginLeft: isLeftSidebarOpen ? "270px" : "40px",
              whiteSpace: "nowrap",
              marginTop: "96px",
            }}
          >
            {lists.map((list) => (
              <List key={list._id} list={list} fetchLists={fetchLists} />
            ))}
          </div>
          <div
            style={{
              // margin: "10px",
              padding: "10px",
              border: "none",
              // borderRadius: "8px",
              backgroundColor: "transparent",
              marginTop: "96px",
            }}
          >
            {showInput ? (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "1px solid gainsboro",
                }}
              >
                <input
                  style={{
                    margin: "10px",
                    padding: "8px 0px 8px 8px",
                    fontSize: "16px",
                    border: "1px solid #C6C6C6",
                    borderRadius: "2px",
                  }}
                  type="text"
                  placeholder="Enter list name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
                <div>
                  <button
                    style={{
                      margin: "10px",
                      padding: "8px",
                      paddingBottom: "6px",
                      fontSize: "16px",
                      fontFamily: "sans-serif",
                      border: "none",
                      borderRadius: "4px",
                      backgroundColor: "hsla(215, 90%, 37.7%, 0.9)",
                      color: "white",
                    }}
                    onClick={addNewList}
                  >
                    + Add
                  </button>
                  <button
                    style={{
                      // margin: "10px",
                      padding: "8px 8px 6px 8px",
                      fontSize: "16px",
                      fontFamily: "sans-serif",
                      border: "none",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      alignItems: "center",
                    }}
                    onClick={() => setShowInput(false)}
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowInput(true)}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "12px",
                  border: "none",
                  borderRadius: "4px",
                  backgroundColor: "hsla(215, 90%, 37.7%, 0.9)",
                  color: "white",
                  maxHeight: "48px",
                }}
              >
                + Add list
              </button>
            )}
          </div>
        </div>
      ) : null}
      {tableView ? (
        <table
          style={{
            width: isLeftSidebarOpen ? "80%" : "97%",
            borderCollapse: "collapse",
            marginLeft: isLeftSidebarOpen ? "270px" : "40px",
            marginTop: "96px",
            backgroundColor: "white",
            position: "absolute",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              >
                List Name
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              >
                Label List
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              >
                Tasks
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              >
                Label Task
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              >
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list._id}>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {list.name}
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      margin: "16px",
                      backgroundColor: list.color || "white",
                      height: "20px",
                      width: "20px",
                    }}
                  ></div>
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {list.tasks.map((task, index) => (
                    <div
                      key={task._id}
                      style={{
                        padding: "8px",
                        borderBottom:
                          list.tasks.length > 1 &&
                          index !== list.tasks.length - 1
                            ? "1px solid #ddd"
                            : "none",
                      }}
                    >
                      {task.name}
                    </div>
                  ))}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {list.tasks.map((task, index) => (
                    <div
                      key={task._id}
                      style={{
                        padding: "8px",
                        margin: "16px",
                        backgroundColor: task.color || "white",
                        height: "20px",
                        width: "20px",
                      }}
                    ></div>
                  ))}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                  }}
                >
                  {list.tasks.map((task, index) => (
                    <div
                      key={task._id}
                      style={{
                        padding: "8px",
                        margin: "16px",
                      }}
                    >
                      {formatDate(task.dueDate)}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {/* Render the chart if isChartVisible is true */}
      {showChart ? (
        <>
          <div
            style={{
              width: isLeftSidebarOpen ? "80%" : "97%",
              marginTop: "96px",
              marginLeft: isLeftSidebarOpen ? "270px" : "40px",
            }}
          >
            <Bar
              style={{ width: "60%" }}
              data={getChartData()}
              color="black"
              options={{
                responsive: true,
                color: "black",
                plugins: {
                  title: {
                    display: false,
                    text: "Task per List",
                    color: "black",
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      color: "black",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "black",
                      stepSize: 1,
                      callback: function (value) {
                        return value % 1 === 0 ? value : "";
                      },
                    },
                  },
                },
              }}
            />
          </div>

          <div
            style={{
              width: isLeftSidebarOpen ? "80%" : "97%",
              marginTop: "96px",
              marginLeft: isLeftSidebarOpen ? "270px" : "40px",
            }}
          >
            <center>
              <Pie
                style={{ width: "60%" }}
                data={getPieChartData()}
                options={{
                  responsive: true,
                  color: "black",
                  plugins: {
                    title: {
                      display: false,
                      text: "Task Completion Status",
                      color: "black",
                    },
                    legend: {
                      position: "top",
                      display: true,
                    },
                  },
                }}
              />
            </center>
          </div>
        </>
      ) : null}
      {showCalendar ? (
        <Calendar
          // onChange={handleCalendarChange}
          // Set the calendar value to the expiration date
          style={{
            width: isLeftSidebarOpen ? "80%" : "97%",
            marginTop: "96px",
            marginLeft: isLeftSidebarOpen ? "270px" : "40px",
            height: "80vh",
          }}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          // defaultDate={new Date()}
          defaultView="month"
          events={events}
          onSelectEvent={(event) => {
            alert(
              `Task name : ${event.title}\nstart date : ${event.start}\nend date : ${event.end}`
            );
          }}
        />
      ) : null}
      {mapView ? (
        <div
          className="location"
          style={{
            width: isLeftSidebarOpen ? "80%" : "97%",
            marginTop: "96px",
            marginLeft: isLeftSidebarOpen ? "270px" : "40px",
            // height: "80vh",
            position: "absolute",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d56923.38019988756!2d75.74589936743743!3d26.91265722877532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!3m2!1d26.9124336!2d75.7872709!4m5!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!3m2!1d26.9124336!2d75.7872709!5e0!3m2!1sen!2sin!4v1735246306305!5m2!1sen!2sin"
            width="100%"
            // height={500}
            style={{ border: 0, height: "80vh" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ) : null}
    </div>
  );
};

export default Taskboard;
