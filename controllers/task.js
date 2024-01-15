import { task } from "../models/task.js";
export const addTask = async (req, res) => {
  const { title, description } = req.body;
  await task
    .create({ title, description, user: req.data })
    .then(() => {
      return res.json({
        success: "true",
        message: "Task Added Sucessfully",
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
export const getTask = async (req, res) => {
  const tasks = await task.find({ user: req.data });
  res.json({
    success: "true",
    tasks,
  });
};
export const updateTask = async (req, res) => {
  const task_data = await task.findById(req.params.id).catch((e) => {
    console.log(e);
  });
  task_data.isCompleted = !task_data.isCompleted;
  await task_data.save();
  res.json({
    success: "true",
    message: "Task Updated",
  });
};
export const editTask = async (req, res) => {
  const { changeTitle, changeDescription, id } = req.body;
  await task.updateOne(
    { _id: id },
    { $set: { title: changeTitle, description: changeDescription } }
  );
  res.json({
    success: "true",
    message: "Task Updated",
  });
};
export const deleteTask = async (req, res) => {
  await task.deleteOne({ _id: req.params.id }).catch((e) => {
    console.log(e);
  });
  res.json({
    success: "true",
    message: "Task Deleted",
  });
};
