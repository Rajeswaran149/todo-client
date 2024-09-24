import { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../config';
import TaskForm from './taskForm'; // Assuming you have this component

const TaskList = ({ initialTasks }) => {
    const [tasks, setTasks] = useState(initialTasks || []);
    const [loading, setLoading] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${base_url}/api/tasks`);
            setTasks(response.data);
        } catch (error) {
            setError("Error fetching tasks");
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${base_url}/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id)); // Remove task from state
        } catch (error) {
            setError("Error deleting task");
            console.error("Error deleting task:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task._id);
        setEditedTask(task.task);
    };

    const handleUpdateClick = async () => {
        if (!editedTask) return;

        setLoading(true);
        setError('');
        try {
            const response = await axios.put(`${base_url}/api/tasks/${editingTaskId}`, { task: editedTask });
            setTasks(tasks.map(t => (t._id === editingTaskId ? response.data : t))); // Update task in state
            setEditingTaskId(null);
            setEditedTask('');
        } catch (error) {
            setError("Error updating task");
            console.error("Error updating task:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        setEditingTaskId(null);
        setEditedTask('');
    };

    // Function to handle adding a task from TaskForm
    const handleTaskAdded = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]); // Update state with new task
    };

    return (
        <div className="mx-auto">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            <TaskForm onTaskAdded={handleTaskAdded} /> {/* Pass the callback */}
            <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="p-3 text-center border border-gray-400">ID</th>
                        <th className="p-3 text-center border border-gray-400">Task</th>
                        <th className="p-3 text-center border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr 
                            key={task._id} 
                            className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                        >
                            <td className="p-3 text-center border border-gray-400">{task.customId}</td>
                            <td className="p-3 text-center border border-gray-400" style={{ width: '70%' }}>
                                {editingTaskId === task._id ? (
                                    <input 
                                        value={editedTask} 
                                        onChange={(e) => setEditedTask(e.target.value)} 
                                        className="border border-gray-400 p-1"
                                    />
                                ) : (
                                    task.task
                                )}
                            </td>
                            <td className="p-3 text-center border border-gray-400" style={{ width: '30%' }}>
                                {editingTaskId === task._id ? (
                                    <>
                                        <button
                                            onClick={handleUpdateClick}
                                            className="text-white m-1 hover:text-green-900 bg-green-500 px-4 py-1 rounded-sm"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={handleCancelClick}
                                            className="text-white m-1 hover:text-yellow-900 bg-yellow-500 px-4 py-1 rounded-sm"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(task)}
                                            className="text-white m-1 hover:text-blue-900 bg-blue-500 px-6 py-1 rounded-sm"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteTask(task._id)} 
                                            className="text-white m-1 hover:text-red-900 bg-red-500 px-4 py-1 rounded-sm"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
