"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import { base_url } from './config';
import TaskForm from "./components/taskForm";
import TaskList from "./components/taskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${base_url}/api/tasks/`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <TaskForm onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
}
