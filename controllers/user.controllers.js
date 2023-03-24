const pool = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from user");
    res.json(rows);
  } catch {
    res.send("hubo un error");
  }
};

const getSession = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [data] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    const passHash = await bcrypt.hash(password, 8);

    /*Functions to req */

    /*Sigin*/
    const sigin = async () => {
      await pool.query("INSERT INTO user (email, password) VALUES (?, ?)", [
        email,
        passHash,
      ]);
      const [response] = await pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      await pool.query("UPDATE user SET apodo_user = ? WHERE email = ? ", [
        "Spartan" + response[0].user_id,
        email,
      ]);
    };

    /*login*/
    const login = async () => {
      const id = data[0].user_id;
      const token = await jwt.sign({ id: id }, process.env.JWT_SECRET);

      console.log(`Esto es un Token: ${token} generado por JWT`);
      await res.cookie("jwt", token);
      res.json("Login Correcto");
    };

    /* Conditionals to req  */

    if (req.params.session == "register") {
      if (data.length >= 1) {
        res.status(500).json("Ya existe una cuenta con este correo");
      } else {
        sigin();
        res.json("Registro con éxito");
      }
    }

    if (req.params.session == "login") {
      if (
        data.length >= 1 &&
        (await bcrypt.compare(password, data[0].password))
      ) {
        login();
      } else {
        res.json("Usuario o contraseña incorrecta");
      }
    }
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
};

const logOut = ()=>{
  
}

module.exports = { getUser, getSession };
