import { UploadedFile } from "express-fileupload";
import Course from "../Course";
import FileService from "./File.service";

class CourseService {
  async create(course: { author: string; title: string; content: string; picture: UploadedFile | undefined }) {
    if (course.picture) {
      const fileName = FileService.saveFile(course.picture);
      console.log("fileName", fileName, { ...course, picture: fileName });
      const createdCourse = await Course.create({ ...course, picture: fileName });
      return createdCourse;
    }
    const createdCourse = await Course.create(course);
    return createdCourse;
  }
  async getAll() {
    const courses = await Course.find();
    return courses;
  }
  async getOne(id: string) {
    if (!id) {
      throw new Error("id is not found");
    }
    const course = await Course.findById(id);
    return course;
  }
  async updateOne(courseData: { _id: string; author: string; title: string; content: string; __v: number }) {
    if (!courseData._id) {
      throw new Error("id is not found");
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseData._id, courseData, { new: true });
    return updatedCourse;
  }
  async deleteOne(id: string) {
    if (!id) {
      throw new Error("id is not found");
    }
    const deletedCourse = await Course.findByIdAndDelete(id);
    return deletedCourse;
  }
}

export default new CourseService();
