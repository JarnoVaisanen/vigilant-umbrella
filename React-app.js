import react, from { usestate } from 'react'

function ToDolist(){

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = usestate("");

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

        <h1To-Do-List></h1>

        <div>
            <input
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handleInputChange}/>
            <button 
                className="add-button"
                onClick={}>
                Add
            </button>
        </div>

    </div>);
            
}
export default ToDoList
