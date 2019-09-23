import express from "express";
import bodyParse from "body-parser";
import * as httpStatus from "http-status-codes";
import Route from "./routes/route";
import * as cors from "cors";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParse.json());
app.use(cors());

app.use("/api/v1", Route);

app.use("/", (_req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    status: httpStatus.NOT_FOUND,
    error: "Incorrect route"
  });
});

app.listen(port, () => console.log(`Web service started on ${port}`));
export default app;
