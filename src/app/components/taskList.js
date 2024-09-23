import { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../config';

const TaskList = ({ tasks }) => {
    const deleteTask = async (id) => {
        try {
            await axios.delete(`${base_url}/api/tasks/${id}`);
            // Optionally refresh the task list here
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-3 text-left border border-gray-400">ID</th>
                        <th className="p-3 text-left border border-gray-400">Task</th>
                        <th className="p-3 text-left border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr 
                            key={task._id} 
                            className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                        >
                            <td className="p-3 border border-gray-400">{task.customId}</td>
                            <td className="p-3 border border-gray-400">{task.task}</td>
                            <td className="p-3 border border-gray-400">
                                <button 
                                    onClick={() => deleteTask(task._id)} 
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
