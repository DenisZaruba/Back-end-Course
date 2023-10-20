import express from "express";
import mongoose from "mongoose";
import Course from "./Course";
import router from "./routers/rotuer";
import fileUpload from "express-fileupload";

const cors = require("cors");

export const app = express();
const port = 4025;
export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  NOT_FOUND_404: 404,
  BAD_REQUEST_400: 400,
};

const DB_URL = "mongodb+srv://deniszaruba03:nwkBCBP3ZFy8C9N1@courses.53kwkqz.mongodb.net/?retryWrites=true&w=majority";

const jsonBody = express.json();
app.use(jsonBody);
app.use(express.static("static"));
app.use(fileUpload({}));

app.use(cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
