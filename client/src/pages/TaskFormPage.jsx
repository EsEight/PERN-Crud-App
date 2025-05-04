import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TaskFormPage() {
  const { createTask, getTask,getTasks, updateTask, refreshTasks} = useTasks();
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue('description', task.description)
      }
    }
    loadTask()
  }, []);

  const onSubmit = handleSubmit((data) => {
     if(params.id) {
       updateTask(params.id,data)
     } else {
      createTask(data);
     
     }
     navigate("/tasks");
  });

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            {...register("title")}
            className="w-full bg-zinc-700 outline-none text-white px-2 py-2 rounded-md my-2"
            autoFocus
          />
          <textarea
            rows="3"
            placeholder="Task Description"
            {...register("description")}
            className="w-full bg-zinc-700 outline-none resize-none text-white px-2 py-2 rounded-md my-2"
          ></textarea>
          <button className="bg-indigo-500 px-4 py-1 rounded-sm">Add</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
