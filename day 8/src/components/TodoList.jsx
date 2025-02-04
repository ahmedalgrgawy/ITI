import { useEffect, useState } from "react";

const TodoList = () => {
    const [list, setList] = useState(() => {
        const savedTasks = localStorage.getItem('todoList');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list));
    }, [list]);

    const handleInput = (event) => {
        setNewTask(event.target.value);
    };

    const addTask = () => {
        if (!newTask.trim()) return;

        if (editingId !== null) {
            setList(list.map(task =>
                task.id === editingId
                    ? { ...task, taskName: newTask }
                    : task
            ));
            setEditingId(null);
        } else {
            const task = {
                id: list.length === 0 ? 1 : list[list.length - 1].id + 1,
                taskName: newTask,
                done: false,
            };
            setList([...list, task]);
        }

        setNewTask('');
    };

    const deleteTask = (id) => {
        setList(list.filter((task) => task.id !== id));
    };

    const startEditing = (task) => {
        setEditingId(task.id);
        setNewTask(task.taskName);
    };

    const doneFunction = (id) => {
        setList(
            list.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    return (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center p-8">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Todo List</h1>

                <div className="flex mb-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={handleInput}
                        placeholder="Enter a task"
                        className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                    >
                        {editingId !== null ? 'Update' : 'Add Task'}
                    </button>
                </div>

                <div className="space-y-2">
                    {list.map((task) => (
                        <div
                            key={task.id}
                            className={`flex items-center justify-between p-3 rounded-md ${task.done
                                ? 'bg-green-100 line-through text-gray-500'
                                : 'bg-gray-50 hover:bg-gray-100'
                                }`}
                        >
                            <span className="flex-grow">{task.taskName}</span>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => startEditing(task)}
                                    className="text-blue-500 hover:text-blue-700 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => doneFunction(task.id)}
                                    className={`${task.done
                                        ? 'text-green-700'
                                        : 'text-gray-500 hover:text-green-700'
                                        } transition`}
                                >
                                    {task.done ? 'Undo' : 'Done'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoList