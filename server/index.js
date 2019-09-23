import express from "express";
import bodyParser from "body-parser";
import * as httpStatus from "http-status-codes";
import Route from "./routes/route";

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urleconded({ extended: false }));

app.use("/api/v1", Route);

app.use("/", (_req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    status: httpStatus.NOT_FOUND,
    error: "Incorrect route"
  });
});

app.listen(port, () => console.log(`Web service started on ${port}`));
export default app;
