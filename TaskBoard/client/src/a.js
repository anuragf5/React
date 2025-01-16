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

import moment from "moment";
const localizer = momentLocalizer(moment);

const Taskboard = () => {
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

  {
    showChart ? (
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
              data={[
                {
                  title: "Due Date",
                  value: dueDateList.length,
                  color: "#e2483d",
                },
                {
                  title: "No due Date",
                  value: taskItem.length - dueDateList.length,
                  color: "#454f59",
                },
                // { title: "Three", value: 20, color: "#6A2135" },
              ]}
              options={{
                responsive: true,
                color: "white",
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
    ) : null;
  }
}

export default Taskboard;