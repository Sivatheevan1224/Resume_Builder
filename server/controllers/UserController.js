import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  //function to generate JWT token (implementation not shown here)
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
//controller for user registration

// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if required fields are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    //create new user

    //hash the password before saving

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });

    //return success message with token
    const token = generateToken(newUser._id);
    newUser.password = undefined; //hide password in response

    return res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });


  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for user console.log();


// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }
    //compare password
    const isMatch = await existingUser.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    //return success message with token
    const token = generateToken(existingUser._id);
    existingUser.password = undefined; //hide password in response
    return res
      .status(200)
      .json({ message: "User logged in successfully", token, user: existingUser });


  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for get user by id
//GET: /api/users/data

export const getUserById = async (req, res) => {
  try {
    
    const userId = req.userId;
    //check with user exits
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    //return user data
    existingUser.password = undefined; //hide password in response

    return res
      .status(200)
      .json({user: existingUser });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
