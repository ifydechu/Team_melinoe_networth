import * as httpStatus from "http-status-codes";
import Model from "../models/db";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";

const model = () => new Model("users");

const signUp = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log("ghh", email, password);
    const user = await model().select("*", "email=$1", [email]);
    if (user[0]) {
      return res.status(httpStatus.CONFLICT).json({
        status: "error",
        error: `${email} already exists!`
      });
    }

    password = await argon2.hash(password);
    const cols = "email, password";
    const sels = `'${email}', '${password}'`;
    let row = await model().insert(cols, sels);

    let jwToken = generateToken(row[0].id, row[0].email);

    return res.status(httpStatus.CREATED).json({
      status: "201",
      message: "User created successfully",
      data: {
        token: jwToken
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server error",
      error: e
    });
  }
};

const login = async (req, res) => {
  console.log("Hello");
  try {
    const { email, password } = req.body;
    const isLogin = await model().select("*", "email=$1", [email]);

    if (isLogin[0] && (await argon2.verify(isLogin[0].password, password))) {
      const jwToken = generateToken(isLogin[0].id, isLogin[0].email);
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
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      error: e
    });
  }
};

const generateToken = (id, email) => {
  const signature = "LEET_K0D3";
  const token = jwt.sign(
    {
      Id: id,
      email: email
    },
    signature,
    { expiresIn: "1d" }
  );
  return token;
};

export { login, signUp };
