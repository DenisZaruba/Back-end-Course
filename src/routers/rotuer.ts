import { Router } from "express";
import Course from "../Course";
import { HTTP_STATUSES } from "..";
import CoursesController from "./../controllers/Courses";

const router = Router();

router.post("/courses", CoursesController.create);
router.get("/courses", CoursesController.getAll);
router.get("/courses/:id", CoursesController.getOne);
router.delete("/courses/:id", CoursesController.deleteOne);
router.put("/courses", CoursesController.updateOne);
export default router;
