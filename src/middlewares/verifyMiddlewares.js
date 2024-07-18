import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization ||
      req.header("Authorization")?.replace("Bearer", " ");
    // console.log("middlewares controller", authorization);
    // console.log("asb");
    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized access" });
    }
    const token = authorization?.split(" ")[1];
    // console.log("split token middleware", token);
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      function (error, decoded) {
        if (error) {
          return res.status(403).send({ message: "Forbidden access" });
        }
        req.decoded = decoded;
        next();
        // console.log(decoded);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
