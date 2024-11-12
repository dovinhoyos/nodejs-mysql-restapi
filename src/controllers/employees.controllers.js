import pool from "../database.js";

export const getEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM employees");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("SELECT * FROM employees WHERE id =?", [
      id,
    ]);
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO employees (name, salary) VALUES (?,?)",
      [name, salary]
    );
    res.status(201).json({ id: result.insertId, name, salary });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id =?",
      [name, salary, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Employee not found" });
    }
    const updatedEmployee = await pool.query(
      "SELECT * FROM employees WHERE id =?",
      [id]
    );
    res.status(200).json(updatedEmployee[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id =?", [
      id,
    ]);
    if (result.affectedRows <= 0) {
      res.status(404).json({ message: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
