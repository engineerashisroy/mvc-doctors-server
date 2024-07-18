import { Doctor } from "../models/doctors.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const doctorPostController = asyncHandler(async (req, res, next) => {
  try {
    const doctor = req.body;
    const result = await Doctor.insertMany(doctor);
    res.status(200).send({ result, message: "success" });
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server error" });
  }
});

const doctorsGetController = asyncHandler(async (req, res) => {
  try {
    const result = await Doctor.find();
    res.status(200).send(result);
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error!" });
  }
});

const deleteDoctorController = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const filter = { email: email };
    const result = await Doctor.deleteOne(filter);
    res.status(200).send(result);
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error!" });
  }
});
export { doctorPostController, doctorsGetController, deleteDoctorController };
