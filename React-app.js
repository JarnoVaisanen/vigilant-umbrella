import react, { useState } from 'react'

function ToDolist() {

    const [tasks, setTasks] = useState(["Tee aamupala, Hae paketti, Soita pomolle"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);

    }

    function addtask(){

    }

    function deleteTask(index){

    }

    function moveTaskUp(index){

    }

    function moveTaskDown(index){

    }

    return(
    <div className="to-do-list">

        <h1>To-Do-List</h1>

        <div>
            <input
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handleInputChange}/>
            <button 
                className="add-button"
                onClick={addTask}>
                Add
            </button>
        </div>

        <ol>
            {tasks.map((task, index) =>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button
                        className="delete-button"
                        onClick={() => deleteTask(index)}>
                        Delete
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskUp(index)}>
                        Up
                    </button>
                    <button
                        className="move-button"
                        onClick={() => moveTaskDown(index)}>
                        Down
                    </button>
                </li>
            )}
        </ol>

    </div>);
            
}
export default ToDoList

Onst x callback
Onst y callback
use callback
