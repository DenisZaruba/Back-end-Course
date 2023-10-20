import request from "supertest";
import { app } from "../../src";

describe("/course", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });
  it("should return 200 and empty array", async () => {
    await request(app).get("/courses").expect(200, []);
  });

  it("should return 404 for not existed course", async () => {
    await request(app).get("/courses/1").expect(404);
  });

  it("Should create course with correct input data", async () => {
    const createdResponse = await request(app).post("/courses").send({ title: "new course" }).expect(201);

    const createdCourse = createdResponse.body;

    expect(createdCourse).toEqual({
      id: expect.any(Number),
      title: "new course",
    });

    await request(app).get("/courses").expect(200, [createdCourse]);
  });

  it("should return 204 for updated course", async () => {
    const newCourseResponse = await request(app).get("/courses").expect(200);
    const newCouse = newCourseResponse.body;
    await request(app).put(`/courses/${newCouse?.[0].id}`).send({ title: "updated" }).expect(204);
  });
});
