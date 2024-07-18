import { Service } from "../models/services.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getServicesController = asyncHandler(async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).send(services);
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error" });
  }
});

export { getServicesController };
