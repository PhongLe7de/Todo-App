import { useState, useEffect} from 'react';
import './Todo.css';

function Task({task, index, completeTask,removeTask}){
    const handleSubmitComplete = function(){
        return completeTask(index)
    }

    const handleRemoveTask = function(){
        return removeTask(index)
    }

    return(
        <div
            className='task'
            style={{textDecoration: task.completed ? "line-through" : " "}}
        >
            {task.title}
            <button onClick = {handleSubmitComplete}>Complete</button>
            <button style={{backgroundColor:"red"}} onClick = {handleRemoveTask}>X</button>
        </div>
    )
}

function CreateTask({addTask}){
    const [value, setValue] = useState("")

    const handleSubmit = function(e){
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("")
    }

    return (
        <form onSubmit ={handleSubmit}>
            <input
                type='text'
                className='input'
                value={value}
                placeholder='Add a new task'
                onChange={e => setValue(e.target.value)}
            />
        </form>
    )
}


function Todo(){
    const [tasksRemaining, setTasksRemaining] = useState(0)
    const [tasks, setTasks] = useState([
        {
            title: 'Grab some pizza',
            completed: true,
        },
        {
            title: 'Do your workout',
            completed: true,
        },
        {
            title: 'Hangout with friends',
            completed: false,
        }
    ]);

    const addTask = function(title){
        const newTasks = [...tasks,{title, completed: false}]
        setTasks(newTasks)
    }

    const completeTask = function(index){
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks)
    }

    const removeTask = function(index){
        const newTasks = [...tasks];
        newTasks.splice(index, 1)
        setTasks(newTasks)
    }

    const taskDone = function(task){
        return(!task.completed)
    }

    useEffect(function(){
        setTasksRemaining(tasks.filter(taskDone).length)
    })
    return (
        <div className='todo-container'>
            <div className='hearder'>Pending Task {tasksRemaining}</div>
            <div className='tasks'>
                {tasks.map((task,index)=>(
                    <Task
                        task={task}
                        index={index}
                        key={index}
                        completeTask={completeTask}
                        removeTask = {removeTask}
                    />
                )
                )}
            </div>
            <div className='create-task'>
                <CreateTask
                    addTask={addTask}
                />
            </div>
        </div>
    )
}

export default Todo