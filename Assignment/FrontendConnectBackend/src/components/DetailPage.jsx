// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// function DetailPage() {
//   const { id } = useParams(); // Access the user ID from the URL params
//   const [user, setUser] = useState([]);

//   // Fetch user details on component mount
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/user/getById/${id}`
//         );
//         setUser(response.data);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);

//   return (
//     <div>
//       <span>Welcome user</span>
//       <span>
//       <Link to="/">
//         <button>Logout</button>
//       </Link>
//       </span>
//     </div>
//   );
// }

// export default DetailPage;


import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskBoard = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [error, setError] = useState("");

  // Backend API URL
  const api = "http://localhost:8080"; // Update with your backend URL if needed

  // Create List Method
  const createList = async (listName) => {
    try {
      const response = await axios.post(`${api}/createList`, { listName });
      setLists([...lists, response.data]); // Add the new list to the state
      setNewListName("");
    } catch (err) {
      setError("Error creating list");
      console.error("Error creating list:", err);
    }
  };

  // Get All Lists Method
  const getLists = async () => {
    try {
      const response = await axios.get(`${api}/getList`);
      setLists(response.data);
    } catch (err) {
      setError("Error fetching lists");
      console.error("Error fetching lists:", err);
    }
  };

  // Create Task Method
  const createTask = async (taskName, listId) => {
    try {
      const response = await axios.post(`${api}/createTask`, {
        taskName,
        listId,
        completed: false,
      });
      const updatedLists = lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, response.data] }
          : list
      );
      setLists(updatedLists); // Update the list with the new task
      setNewTaskName("");
    } catch (err) {
      setError("Error creating task");
      console.error("Error creating task:", err);
    }
  };

  // Move Task Method
  const moveTask = async (id, listId) => {
    try {
      const response = await axios.put(`${api}/moveTask/${id}`, {
        listId,
      });
      const updatedLists = lists.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, response.data] }
          : { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
      );
      setLists(updatedLists); // Update the lists after task move
    } catch (err) {
      setError("Error moving task");
      console.error("Error moving task:", err);
    }
  };

  // Mark Task as Completed Method
  const taskCompleted = async (id) => {
    try {
      const response = await axios.put(`${api}/taskCompleted/${id}`);
      const updatedLists = lists.map((list) => ({
        ...list,
        tasks: list.tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        ),
      }));
      setLists(updatedLists); // Update the list after task is completed
    } catch (err) {
      setError("Error completing task");
      console.error("Error completing task:", err);
    }
  };

  // Fetch Lists when Component Mounts
  useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      <h1>Task Board</h1>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create List */}
      <div>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
        />
        <button onClick={() => createList(newListName)}>Create List</button>
      </div>

      {/* Display Lists and Tasks */}
      <div>
        {lists.map((list) => (
          <div
            key={list.id}
            style={{ display: "inline-block", margin: "10px" }}
          >
            <h2>{list.listName}</h2>

            {/* Create Task */}
            <div>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="New Task"
              />
              <button onClick={() => createTask(newTaskName, list.id)}>
                Create Task
              </button>
            </div>

            {/* Display Tasks in List */}
            <div>
              {list.tasks.map((task) => (
                <div key={task.id} style={{ margin: "5px 0" }}>
                  <p>{task.taskName}</p>

                  {!task.completed && (
                    <>
                      <button onClick={() => taskCompleted(task.id)}>
                        Complete
                      </button>
                      <button onClick={() => moveTask(task.id, list.id)}>
                        Move to This List
                      </button>
                    </>
                  )}
                  {task.completed && <span>Completed</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
