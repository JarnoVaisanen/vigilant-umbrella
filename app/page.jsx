"use client";

import { useState, useEffect } from "react";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tasks from MongoDB on mount
  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== "") {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask }),
      });
      const created = await res.json();
      setTasks(t => [...t, created]);
      setNewTask("");
    }
  }

  async function deleteTask(index) {
    const task = tasks[index];
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task._id }),
    });
    setTasks(tasks.filter((_, i) => i !== index));
  }

  async function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      // Swap text in DB
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id1: tasks[index]._id,
          text1: tasks[index].text,
          id2: tasks[index - 1]._id,
          text2: tasks[index - 1].text,
        }),
      });
      setTasks(updatedTasks);
    }
  }

  async function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id1: tasks[index]._id,
          text1: tasks[index].text,
          id2: tasks[index + 1]._id,
          text2: tasks[index + 1].text,
        }),
      });
      setTasks(updatedTasks);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button className="add-button" onClick={addTask}>
          Lisää
        </button>
      </div>

      {loading && <p style={{ color: 'white' }}>Ladataan...</p>}

      <ol>
        {tasks.map((task, index) => (
          <li key={task._id?.toString() || index}>
            <span className="text">{task.text}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Poista
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              Ylös
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              Alas
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
