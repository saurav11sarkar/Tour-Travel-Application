import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import router from "./routes/routes";
import {globalErrorHandler} from "./middlewares/golobalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h3 style="color: red; text-align: center;">Server is running 🚀</h3>'
    );
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: "Bad request✨",
  });
});

app.use(globalErrorHandler);

export default app;
