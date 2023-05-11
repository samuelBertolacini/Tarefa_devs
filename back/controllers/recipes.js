import { db } from "../db.js";

export const getRecipes = (_,res) => {
    const q = "SELECT * FROM recipes";

    db.query(q, (err,data) => {
        if (err) return res.json(err);
    
        return res.status(200).json(data);
    });
};



export const addRecipe = (req, res) => {
    const q = 
    "INSERT INTO recipes(`id`, `name`, `language`, `oven`, `mainIngredient`, `dish`, `weight`, `temp`, `ingredients`, `instructions`) VALUES(?)";

    const values = [
        req.body.id,
        req.body.name,
        req.body.language,
        req.body.oven,
        req.body.mainIngredient,
        req.body.dish,
        req.body.weight,
        req.body.temp,
        req.body.ingredients,
        req.body.instructions,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Receita cadastrada com sucesso. ");
    });
};

export const updateRecipe = (req,res) => {
    const q = 
    "UPDATE recipes SET `name`= ?, `language` = ?, `oven` = ?, `mainIngredient` = ? , `dish` = ? , `weight` = ? , `temp` = ? , `ingredients` = ? , `instructions` = ? WHERE `id` = ?";

    const values = [
        req.body.name,
        req.body.language,
        req.body.oven,
        req.body.mainIngredient,
        req.body.dish,
        req.body.weight,
        req.body.temp,
        req.body.insgredients,
        req.body.instructions,
    ];

    db.query(q,[...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Receita atualizada com sucesso. ");

    });
};

export const deleteRecipe = (req,res) => {
    const q = "DELETE FROM recipes WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Receita deletada com sucesso");
    });
};
