import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshTasks, setRefreshTasks] = useState(false)

  const getTasks = async () => {
   try {
    const res = await getTasksRequest()
   setTasks(res.data)
   } catch (error) {
    console.log(error)
   }
  }

  const createTask = async (task) => {
   try {
    await createTaskRequest(task)
     setRefreshTasks(true)
   } catch (error) {
    console.log(error)
   }
  
  };

  const deleteTask = async (id) => {
   try {
    const res = await deleteTaskRequest(id)
    if(res.status === 204) setTasks(tasks.filter(task => task.id !== id))
   } catch (error) {
     console.log(error)
   }
  }
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id,task) => {
  try {
    await updateTaskRequest(id,task)
    setRefreshTasks(true)
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        deleteTask,
        getTask,
        updateTask,
        refreshTasks,
        setRefreshTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
