import { Booking } from "../models/bookings.models.js";
import { Service } from "../models/services.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const availableSlotController = asyncHandler(async (req, res, next) => {
  try {
    const date = req.query.date || "Jun 26, 2024";
    //get all services
    const services = await Service.find();
    //get all bookings by the date
    const query = { date: date };
    const bookings = await Booking.find(query);
    services.forEach((service) => {
      const serviceBookings = bookings.filter(
        (b) => b.treatment === service.name
      );
      const booked = serviceBookings.map((s) => s.slot);
      const available = service.slots.filter((s) => !booked.includes(s));
      service.slots = available;
    });

    res.status(200).send(services);
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error!" });
  }
});
export { availableSlotController };
