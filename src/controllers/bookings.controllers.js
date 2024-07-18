import { Booking } from "../models/bookings.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const bookingPostController = asyncHandler(async (req, res, next) => {
  try {
    const booking = req.body;
    //check user booked similar type of service at the same time or not
    const query = {
      treatment: booking.treatment,
      date: booking.date,
      patient: booking.patient,
    };
    const exists = await Booking.findOne(query);
    if (exists) {
      return res.send({ success: false, booking: exists });
    }
    const result = await Booking.insertMany(booking);
    return res.send({ success: true, result });
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error" });
  }
});

const bookingsGetController = asyncHandler(async (req, res, next) => {
  try {
    const patient = req.query.patient;
    const decodedEmail = req.decoded.email;
    // console.log("booking controller decodedEmail", decodedEmail);

    // const query = { patient: patient };
    // const bookings = await Booking.find(query);
    // res.status(200).send(bookings);
    if (patient === decodedEmail) {
      const query = { patient: patient };
      const bookings = await Booking.find(query);
      return res.status(200).send(bookings);
    } else {
      return res.status(403).send({ message: "Forbidden Access" });
    }
  } catch (error) {
    throw new ApiError(500, { message: "Internal Server Error" });
  }
});
export { bookingPostController, bookingsGetController };
