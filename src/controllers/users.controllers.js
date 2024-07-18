import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//users added controller
const putAllUsersController = asyncHandler(async (req, res, next) => {
  try {
    const user = req.body;
    const email = req.params.email;
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: user,
    };
    const result = await User.updateOne(filter, updateDoc, options);
    const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // console.log(token);
    // res.status(200).send({ result, accessToken: token });
    res.status(200).send({ result, token });
  } catch (error) {
    throw new ApiError(500, { message: "Internal server error" });
  }
});
//users admin role create controller
const putAdminUserCreateController = asyncHandler(async (req, res, next) => {
  try {
    const email = req.params.email;
    const requester = req.decoded.email;
    const requesterAccount = await User.findOne({ email: requester });
    if (requesterAccount.role === "admin") {
      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await User.updateOne(filter, updateDoc);
      res.status(200).send(result);
    } else {
      res.status(403).send({ message: "Forbidden Access" });
    }
  } catch (error) {
    throw new ApiError(500, { message: "Internal server error" });
  }
});

//check admin or not

const getAdminOrNotController = asyncHandler(async (req, res, next) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    const isAdmin = user.role === "admin";
    res.status(200).send({ admin: isAdmin });
  } catch (error) {
    throw new ApiError(500, { message: "Internal server error" });
  }
});
const getAllUsersController = asyncHandler(async (req, res, next) => {
  try {
    const result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error!" });
  }
});
export {
  putAllUsersController,
  getAllUsersController,
  putAdminUserCreateController,
  getAdminOrNotController,
};
