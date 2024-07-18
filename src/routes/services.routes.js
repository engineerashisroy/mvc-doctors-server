import { Router } from "express";
import { getServicesController } from "../controllers/services.controllers.js";
import {
  bookingPostController,
  bookingsGetController,
} from "../controllers/bookings.controllers.js";
import { availableSlotController } from "../controllers/combines.controllers.js";
import {
  getAdminOrNotController,
  getAllUsersController,
  putAdminUserCreateController,
  putAllUsersController,
} from "../controllers/users.controllers.js";
import { verifyJWT } from "../middlewares/verifyMiddlewares.js";
import {
  deleteDoctorController,
  doctorPostController,
  doctorsGetController,
} from "../controllers/doctors.controllers.js";
import { verifyAdmin } from "../middlewares/verifyAdminMiddlewares.js";
const router = Router();

router.route("/services").get(getServicesController);
//booking post api

router.route("/booking").post(bookingPostController);
//available slots
router.route("/available").get(availableSlotController);
//get booking user
router.route("/booking").get(verifyJWT, bookingsGetController);

//users route
router.route("/user/:email").put(putAllUsersController);
router.route("/users").get(verifyJWT, getAllUsersController);
//admin route crate
router
  .route("/users/admin/:email")
  .put(verifyJWT, putAdminUserCreateController);
//check amdin or not route
router.route("/admin/:email").get(verifyJWT, getAdminOrNotController);

//doctors route
//post route
router.route("/doctor").post(verifyJWT, verifyAdmin, doctorPostController);
router.route("/doctor").get(verifyJWT, verifyAdmin, doctorsGetController);
router
  .route("/doctor/:email")
  .delete(verifyJWT, verifyAdmin, deleteDoctorController);
export default router;
