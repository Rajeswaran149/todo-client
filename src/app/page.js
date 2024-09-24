"use client";

import { useEffect, useState } from "react";
import axios from 'axios';
import { base_url } from './config';
import TaskForm from "./components/taskForm";
import TaskList from "./components/taskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);

 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
