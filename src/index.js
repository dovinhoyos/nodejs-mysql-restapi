import pool from "./database.js";
import { PORT } from "./config.js";
import app from "./app.js";

const [result] = await pool.query("SELECT 1 + 1 AS result");
console.log(result[0]);
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
