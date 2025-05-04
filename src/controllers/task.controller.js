import { prisma } from "../db.js";

export const getTasks = async (req, res) => {
try {
    const userId = req.user.id;
    const tasks = await prisma.task.findMany({
      where: {
        authorId: parseInt(userId),
      },
    });
    res.json(tasks);
} catch (error) {
    console.log(error)
}
};

export const getTask = async (req, res) => {
try {
    const taskId = req.params.id;

    const foundTask = await prisma.task.findFirst({
      where: {
        id: parseInt(taskId),
      },
    });
  
    if (!foundTask) return res.status(404).json({ message: "Task not found" });
  
    return res.json(foundTask);
} catch (error) {
    console.log(error)
}
};

export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
  const { title, description } = req.body;

  const newTask = await prisma.task.create({
    data: {
      title: title,
      description: description,
      authorId: parseInt(userId),
    },
  });

  return res.json(newTask);
  } catch (error) {
    console.log(error)
  }
};

export const updateTask = async (req, res) => {
 try {
    const id = req.params.id;
    const { title, description } = req.body;
  
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        description: description,
      },
    });
  
    if (!updatedTask) return res.status(400).json({ message: "Task not found" });
  
    return res.json(updatedTask);
 } catch (error) {
    console.log(error)
 }
};

export const deleteTask = async (req, res) => {
try {
    const taskId = req.params.id;

    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(taskId),
      },
    });
  
    if (!deletedTask) return res.status(400).json({ message: "Task not found" });
  
    return res.sendStatus(204);
} catch (error) {
    console.log(error)
}
};
