import { useState } from 'react';
import axios from 'axios';
import { base_url } from '../config';

const TaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (!task) {
            console.warn("No task provided.");
            return;
        }

        try {
            const response = await axios.post(`${base_url}/api/tasks/add`, { task });
            console.log("Task added successfully:", response.data);
            setTask('');
            onTaskAdded(); // Notify parent to refresh task list
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <form onSubmit={addTask} className="mb-4 flex w-full">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="New task..."
                className="border rounded p-2 mr-2 flex-grow"
            />
            <button 
                type="submit" 
                className="bg-blue-500 text-white rounded px-4 py-2"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
