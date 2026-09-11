import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskList from "./TaskList";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("Add a task to get started!");
  const [headingColor, setHeadingColor] = useState("");

  function addTask(event) {
    event.preventDefault();

    if (task.trim() === "") {
      return;
    }

    setTasks([...tasks, task]);
    setMessage("Task added: " + task + "!");
    setTask("");
    setHeadingColor("lightblue");
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">
        
        <h1
          className="mb-4 p-2"
          style={{ backgroundColor: headingColor }}
        >
          Task Planner
        </h1>

        <form onSubmit={addTask}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter task name"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>

        <TaskList tasks={tasks} message={message} />

      </div>
    </div>
  );
}

export default App;
