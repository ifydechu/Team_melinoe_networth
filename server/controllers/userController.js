import * as httpStatus from "http-status-codes";
import Model from "../models/db";
import { jwt } from "jsonwebtoken";

const model = () => new Model("users");

const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const user = await model().select("*", "email=$1", [email]);
    if (user[0]) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        error: `${email} already exists!`
      });
    }

    password = await encryptedPassword(password);
    const cols = "name, email, password";
    const sels = `'${name}', '${email}', '${password}'`;
    let row = await model().insert(cols, sels);

    let jwToken = generateToken(row[0].id, row[0].email, row[0].name);

    return res.status(httpStatus.CREATED).json({
      status: "201",
      message: "User created successfully",
      data: {
        token: jwToken
      }
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "Internal Server error",
      error: e
    });
  }
};

const login = async (req, res) => {
  console.log("Hello");
  try {
    const { email, password } = req.body;
    const isLogin = await model().select("*", "email=$1", [email]);

    if (isLogin[0] && comparePassword(password, isLogin[0].password)) {
      const jwToken = generateToken(
        isLogin[0].id,
        isLogin[0].email,
        isLogin[0].name
      );
      return res.status(httpStatus.OK).json({
        status: 200,
        message: "User logged in successfully",
        data: {
          token: jwToken
        }
      });
    }
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: httpStatus.UNAUTHORIZED,
      error: "error: Invalid email or password"
    });
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Internal server error"
    });
  }
};

const generateToken = (id, email, name) => {
  const signature = "";
  const token = jwt.sign(
    {
      Id: id,
      email: email,
      name: name
    },
    signature,
    { expiresIn: "1d" }
  );
  return token;
};

module.exports = {
  login,
  signUp
};
