import Task from "../models/todo.models.js";

export const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.id
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { isCompleted, limit = 10, page = 1 } = req.query;
    const filter = { user: req.user.id };

    if (isCompleted !== undefined) {
      filter.isCompleted = isCompleted === "true";
    }

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedTask) return res.status(404).json({ message: "Task not found / unauthorized" });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Task not found / unauthorized" });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
