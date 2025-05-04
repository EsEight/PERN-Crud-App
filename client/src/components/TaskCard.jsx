import { useTasks } from "../context/TaskContext"
import { Link } from "react-router-dom";

function TaskCard({task}) {

  const {deleteTask} = useTasks()

  return (
    <div className="bg-zinc-800 max-w-full w-full p-10 rounded-md">
   <section className="flex justify-between">
   <h1 className="text-2xl font-bold">{task.title}</h1>
    <div className="flex gap-x-2 items-center">
        <button className="bg-indigo-500 px-4 py-1 rounded-sm"
        onClick={() => {
            deleteTask(task.id)
        }}>
            Delete
        </button>
        <Link to={`/tasks/${task.id}`} className="bg-indigo-500 px-4 py-1 rounded-sm">
            Edit
        </Link>
    </div>
   </section>
    <p>{task.description}</p>
  </div>
  )
}

export default TaskCard