import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. Lazy Initialization: Load from LocalStorage exactly ONCE before rendering
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("nexus-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [input, setInput] = useState("");

  // 2. Persistence: Save to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("nexus-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 3. Create Task
  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input }]);
      setInput("");
    }
  };

  // 4. Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 5. Edit Task
  const editTask = (id, oldText) => {
    const newText = prompt("Edit your task:", oldText);
    if (newText) {
      setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Nexus Dashboard</h1>
      
      <div className="flex gap-2 mb-8 w-full max-w-md">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="New Task..."
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded shadow">Add</button>
      </div>

      <ul className="w-full max-w-md space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <span>{task.text}</span>
            <div className="flex gap-3 font-semibold">
              <button onClick={() => editTask(task.id, task.text)} className="text-yellow-600 hover:text-yellow-700">Edit</button>
              <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}