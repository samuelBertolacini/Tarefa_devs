import express from "express";
import recipesRoutes from "./routes/recipes.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", recipesRoutes);

app.listen(3001);
