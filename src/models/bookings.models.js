import mongoose from "mongoose";

// Define the booking schema
const bookingSchema = new mongoose.Schema(
  {
    treatmentId: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("booking", bookingSchema);
