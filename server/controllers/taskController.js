const db = require('../db');

exports.getTasks = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM tasks");
    res.status(200).json({ tasks: result.rows });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error", details: error.message });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);
    res.status(200).json({ task: result.rows[0] });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error", details: error.message });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const status = 'pending';
    const result = await db.query(
      "INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *",
      [title, description, status]
    );

    res.status(201).json({ message: "Task created successfully", task: result.rows[0] });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error", details: error.message });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const result = await db.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", task: result.rows[0] });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error", details: error.message });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", task: result.rows[0] });
  } catch (error) {
    next({ status: 500, message: "Internal Server Error", details: error.message });
  }
};
