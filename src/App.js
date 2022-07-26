// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchedtasks = localStorage.getItem("tasks");
    const savedCount = JSON.parse(localStorage.getItem("count"));
    const savedTasks = JSON.parse(fetchedtasks);
    if (savedTasks && savedTasks.length !== 0) {
      setTask(savedTasks);
    }
    if (savedCount && savedCount !== 0) {
      setCount(savedCount);
    }
    document.getElementById("done").style = "display:none";
    document.getElementById("all").style = "display:none";
    document.getElementById("todo").style = "display:block";
  }, []);
  useEffect(() => {
    const json = JSON.stringify(task);
    localStorage.setItem("tasks", json);
  }, [task]);
  useEffect(() => {
    const json = JSON.stringify(count);
    localStorage.setItem("count", json);
  }, [count]);
  const addtask = (e) => {
    e.preventDefault();
    setCount(count+1);
    const newTask = {
      id: count,
      text: e.target.addtask.value,
      status: "Red",
    };
    setTask([...task, newTask]);
    e.target.addtask.value = "";
    // console.log(newTask)
  };
  function todo() {
    document.getElementById("done").style = "display:none";
    document.getElementById("all").style = "display:none";
    document.getElementById("todo").style = "display:block";
  }
  function done() {
    document.getElementById("todo").style = "display:none";
    document.getElementById("all").style = "display:none";
    document.getElementById("done").style = "display:block";
  }
  function all() {
    document.getElementById("done").style = "display:none";
    document.getElementById("todo").style = "display:none";
    document.getElementById("all").style = "display:block";
  }
  function markDone(given){
    for(let i=0;i<task.length;i++){
      if(task[i].id === given.id){
        task[i].status = 'Green';
      }
    }
    setTask([...task]);

  }
  function markunDone(given){
    for(let i=0;i<task.length;i++){
      if(task[i].id === given.id){
        task[i].status = 'Red';
      }
    }
    setTask([...task]);
  }
  function clearTasks(){
    setTask([]);
    setCount(0);
  }
  return (
    <div>
      <div className="navbarindex">
        <a href="/" style={{ textDecoration: "none", color: "white", fontSize:"larger" }}>
          TO DO TASKS
        </a>
      </div>
      <div className="addtaskdiv">
        <form onSubmit={addtask}>
          <input placeholder="Add task" type={"text"} name="addtask" />
          <br />
          <br />
          <input type={"submit"} className="submitbutton" />
        </form>
      </div>
      <table className="maintable">
        <td className="tablist">
          <fieldset>
            <legend id={"todoleg"}>
              <button
                id={"todobut"}
                onClick={todo}
                style={{ backgroundColor: "white", border: "none" }}
              >
                TO DO
              </button>
            </legend>
            <div id={"todo"}>
              {
                task.filter(task1 => task1.status === 'Red').map((task)=>
                <p style={{color:task.status}} key={task.id}>
                  <button className="markdonebut" onClick={() => markDone(task)}>&#128077; 
                  </button>&nbsp;&nbsp;&nbsp;
                  {task.text}
                </p>
                )
              }
            </div>
          </fieldset>
        </td>
        <td className="tablist">
          <fieldset>
            <legend id={"doneleg"}>
              <button
                id={"donebut"}
                onClick={done}
                style={{ backgroundColor: "white", border: "none" }}
              >
                DONE
              </button>
            </legend>
            <div id={"done"}>
              {
                task.filter(task => task.status === 'Green').map((task)=><p style={{color:task.status}} key={task.id}>
                <button className="markundonebut" onClick={() => markunDone(task)}>&#128077; 
                </button>&nbsp;&nbsp;&nbsp;
                {task.text}</p>)
              }
            </div>
          </fieldset>
        </td>
        <td className="tablist">
          <fieldset id={"allleg"}>
            <legend>
              <button
                id={"allbut"}
                onClick={all}
                style={{ backgroundColor: "white", border: "none" }}
              >
                ALL
              </button>
            </legend>
            <div id={"all"}>
              {
                task.map((task)=>
                <p style={{color:task.status}} key={task.id}>{task.text}</p>)
              }
            </div>
          </fieldset>
        </td>
      </table>
      <div className="footerofpage">
        <button className="clearbut" onClick={clearTasks}>Clear all tasks</button>
      </div>
    </div>
  );
}

export default App;
