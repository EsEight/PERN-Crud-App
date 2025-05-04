import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { tasks, getTasks, refreshTasks, setRefreshTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if(refreshTasks) {
    getTasks()
    setRefreshTasks(false)
  }

  if(tasks.length == 0) return <h1>No tasks added.</h1>

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
       <TaskCard task={task} key={task.id}/>
      ))}
    </div>
  );
}

export default TasksPage;
