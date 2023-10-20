import { Request, Response } from "express";
import { HTTP_STATUSES } from "..";
import Course from "../Course";
import CourseService from "../services/Course.service";

class CoursesController {
  async create(req: Request, res: Response) {
    try {
      const pictureFile = Array.isArray(req.files?.picture) ? req.files?.picture[0] : req.files?.picture;
      const { author, title, content } = req.body;
      const course = await CourseService.create({ author, title, content, picture: pictureFile });

      res.status(HTTP_STATUSES.CREATED_201).json(course);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const data = await CourseService.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id is not found" });
      }
      const data = await CourseService.getOne(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async updateOne(req: Request, res: Response) {
    try {
      const course = req.body;

      if (!course._id) {
        res.status(400).json({ message: "Id is not found" });
      }

      const data = await CourseService.updateOne(course);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Id is not found" });
      }

      const data = await CourseService.deleteOne(id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CoursesController();
