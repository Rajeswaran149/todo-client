import { useState } from 'react';
import axios from 'axios';
import { base_url } from '../config';

const TaskForm = ({ onTaskAdded }) => {
    const [task, setTask] = useState('');
    const [error, setError] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (!task) {
            setError("Task cannot be empty.");
            return;
        }

        setError(''); // Clear previous error messages
        try {
            const response = await axios.post(`${base_url}/api/tasks/add`, { task });
            console.log("Task added successfully:", response.data);
            setTask(''); // Clear the input field
            onTaskAdded(response.data); // Pass the new task to the parent
        } catch (error) {
            console.error("Error adding task:", error);
            setError("Error adding task. Please try again."); // Set error message
        }
    };

    return (
        <form onSubmit={addTask} className="mb-4 flex w-full">
            {error && <div className="text-red-500 mr-2">{error}</div>}
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
