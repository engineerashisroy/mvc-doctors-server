import { User } from "../models/users.models.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const requrester = req.decoded.email;
    const requesterAccount = await User.findOne({ email: requrester });
    if (requesterAccount.role === "admin") {
      next();
    } else {
      res.status(403).send({ message: "forbidden!" });
    }
  } catch (error) {
    console.log(error);
  }
};
