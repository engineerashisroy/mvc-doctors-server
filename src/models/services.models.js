import mongoose from "mongoose";

const servicesScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slots: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Service = mongoose.model("service", servicesScheme);
