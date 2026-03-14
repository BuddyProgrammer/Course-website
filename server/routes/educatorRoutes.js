import express from "express";
import { 
  addCourse, 
  getEducatorCourses, 
  getEnrolledStudentsData, 
  updateRoleToEducator,
  educatorDashboardData
} from "../controllers/educatorController.js";

import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";
import { requireAuth } from "@clerk/express";

const educatorRouter = express.Router();

// update role
educatorRouter.get("/update-role", requireAuth(), updateRoleToEducator);

// add course
educatorRouter.post(
  "/add-course",
  requireAuth(),
  upload.single("image"),
  protectEducator,
  addCourse
);

// get educator courses
educatorRouter.get(
  "/courses",
  requireAuth(),
  protectEducator,
  getEducatorCourses
);

// dashboard data
educatorRouter.get(
  "/dashboard",
  requireAuth(),
  protectEducator,
  educatorDashboardData
);

// enrolled students
educatorRouter.get(
  "/enrolled-students",
  requireAuth(),
  protectEducator,
  getEnrolledStudentsData
);

export default educatorRouter;