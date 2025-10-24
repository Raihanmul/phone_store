import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routes/usersRoute.js";
import productRouter from "./routes/productRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  testConnection();
});
