import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./db/connectDB.js";
import servicesRouter from "./routes/services.routes.js";
const port = process.env.PORT || 8000;
const app = express();
//configuration
app.use(express.json({ limit: "16kb" }));
app.use(cors());
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public/temp"));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello world");
});

//routes
app.use("/api/v1", servicesRouter);
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb connection faild !!", error);
  });
