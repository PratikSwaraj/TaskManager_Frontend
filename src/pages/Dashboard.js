import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ token }) {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "Work",
    status: "To-Do",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/api/tasks/${editTaskId}`,
          taskData,
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post("http://localhost:8080/api/tasks", taskData, {
          headers: { Authorization: token },
        });
      }
      fetchTasks();
      resetForm();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setIsEditing(true);
    setEditTaskId(task._id);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const resetForm = () => {
    setTaskData({ title: "", description: "", category: "Work", status: "To-Do" });
    setIsEditing(false);
    setEditTaskId(null);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: { Authorization: token },
      });

      localStorage.removeItem("token");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Task Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Task" : "Add New Task"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={taskData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
            {isEditing && (
              <button
                onClick={resetForm}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
          >
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Category: {task.category}</p>
            <p className="text-sm text-gray-500">Status: {task.status}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
