import express from "express";
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from "../controllers/recipes.js"

const router = express.Router()

router.get("/", getRecipes);

router.post("/", addRecipe);

router.put("/:id", updateRecipe);

router.delete("/:id", deleteRecipe);

export default router