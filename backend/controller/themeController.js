import pool from "../config/database.js";

export const changeTheme = async (req, res) => {
  try {
    const { themeName } = req.body;
    const result = await pool.query(`UPDATE theme SET name = $1 WHERE id = 1`, [themeName]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Theme not found" });
    }

    res.status(200).json({ message: "Theme updated successfully", theme: themeName });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTheme = async (req, res) => {
  try {
    const themeResult = await pool.query("SELECT name FROM theme WHERE id = 1");

    if (themeResult.rows.length > 0) {
      const themeName = themeResult.rows[0].name;
      res.json(themeName);
    } else {
      res.status(404).send("Theme not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
