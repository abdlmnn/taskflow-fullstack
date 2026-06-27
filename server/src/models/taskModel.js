import db from "../config/database.js";

export const getAllTasks = ({ search = "", status = "all" }) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM tasks WHERE 1 = 1`;
    const params = [];

    if (search.trim()) {
      query += ` AND LOWER(title) LIKE LOWER(?)`;
      params.push(`%${search.trim()}%`);
    }

    if (status === "active") {
      query += ` AND is_completed = 0`;
    }

    if (status === "inactive") {
      query += ` AND is_completed = 1`;
    }

    query += ` ORDER BY created_at DESC`;

    db.all(query, params, function (error, rows) {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};

export const createTask = (taskData) => {
  const { title, description, due_date } = taskData;

  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)`,
      [title, description, due_date],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve({
            id: this.lastID,
            title,
            description,
            due_date,
            is_completed: 0,
          });
        }
      },
    );
  });
};

export const findTaskById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM tasks WHERE id = ?`, [id], function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(row);
      }
    });
  });
};

export const updateTask = (id, taskData) => {
  const { title, description, due_date, is_completed } = taskData;

  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE tasks SET title = ?, description = ?, due_date = ?, is_completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [title, description, due_date, is_completed, id],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve({
            id,
            changes: this.changes,
          });
        }
      },
    );
  });
};

export const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({
          id,
          changes: this.changes,
        });
      }
    });
  });
};

export const deleteAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM tasks`, [], function (error) {
      if (error) {
        reject(error);
      } else {
        resolve({
          changes: this.changes,
        });
      }
    });
  });
};
