import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

//register new user function---------------------------//
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, phone, email, password, isAdmin } = req.body;
    if (!firstname || !lastname || !phone || !email || !password) {
      return res.status(404).json({ message: "all fields required" });
    }
    //check if the user is already existing
    const existing = await User.findOne({
      firstname: firstname,
      lastname: lastname,
    });
    if (existing) {
      return res.status(404).json({
        message: `${existing.firstname} ${existing.lastname} already exists`,
      });
    }
    //check if the phone number already used
    const existPhone = await User.findOne({ phone });
    if (existPhone) {
      return res
        .status(404)
        .json({ message: `${existPhone.phone} already used` });
    }
    //check if the email is already used
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(404).json({ message: "Email already used" });
    }
    //hash the entered password
    const hashPassword = await bcrypt.hash(password, 10);
    //create new user
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashPassword,
      phone: phone,
      isAdmin: isAdmin,
    });

    if (user) return res.status(201).json(user);
    //
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//login user function ------------------------------------//
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    //check that the email and password are not empty
    if (!email || !password) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    //check that the email is exist
    const existEmail = await User.findOne({ email: email });
    if (!existEmail) {
      return res.status(404).json({ message: "email didn't exist" });
    }
    //compare the password entered with the existing password
    const isValid = await bcrypt.compare(password, existEmail.password);
    if (!isValid) {
      //password inccorect
      return res.status(404).json({ message: "password incorrect" });
    } else {
      //password correct
      generateToken(res, existEmail._id);
      res.status(200).json(existEmail);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//logout user function -----------------------------//
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get all users function --------------------------//
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//get user by id function --------------------------//
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//update user by id function --------------------------//
const updateUserById = asyncHandler(async (req, res) => {
  try {
    //get user infos from user
    const { isAdmin } = req.body;
    //find user by id in parameters
    const user = await User.findById(req.params.id);

    if (user) {
      user.isAdmin = Boolean(!isAdmin) || user.isAdmin;
    } else {
      return res.status(404).json({ message: "user not found" });
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
    });

    //
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

//delete user by id function --------------------------//
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// get current user function --------------------------------//
const currentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// update current user function --------------------------------//
const updateCurrentUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);

    if (user) {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne(req.user._id);

    if (user) {
      if (await bcrypt.compare(user.password, req.body.password)) {
        return res.status(404).json({ message: "Chose another password" });
      }
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await user.save();
    res.status(200).json({ message: "password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

// create shipping address to current user
const addShippingAddress = asyncHandler(async (req, res) => {
  try {
    const { address, country, city, postalCode } = req.body;
    // check all fields in not empty
    if (!address || !country || !city || !postalCode) {
      return res.status(404).json({ message: "all fields required" });
    }

    const user = await User.findOne(req.user._id);
    if (user) {
      (user.shippingAddress.address = address),
        (user.shippingAddress.city = city),
        (user.shippingAddress.country = country),
        (user.shippingAddress.postalCode = postalCode);
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUser,
  currentUser,
  updateCurrentUser,
  addShippingAddress,
  changeCurrentPassword,
};
