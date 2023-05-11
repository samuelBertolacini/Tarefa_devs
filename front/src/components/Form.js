import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";



const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    z-index: 9999;
`;

const InputArea1 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InputArea2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InputArea3 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InputArea4 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InputArea5 = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InputArea = styled.div`
    display: flex;
    flex-direction: inline;
    width: 100%;
`
const Input1 = styled.input`
    width: 350px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
    margin-right: 20px;
`;
const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.h4``;

const Button = styled.button `
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    
`;



const Form = ({ getRecipes, onEdit, setOnEdit }) => {
    const ref = useRef();

    

    useEffect(() => {
        if (onEdit) {
            const recipes = ref.current;

            recipes.name.value = onEdit.name;
            recipes.language.value = onEdit.language;
            recipes.oven.value = onEdit.oven;
            recipes.mainIngredient.value = onEdit.mainIngredient;
            recipes.dish.value = onEdit.dish;
            recipes.weight.value = onEdit.weight;
            recipes.temp.value = onEdit.temp;
            recipes.ingredients.value = onEdit.ingredients;
            recipes.instructions.value = onEdit.instructions;
        }        
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipe = ref.current;

        if (
            !recipe.name.value ||
            !recipe.language.value ||
            !recipe.oven.value ||
            !recipe.mainIngredient.value|| 
            !recipe.dish.value ||
            !recipe.weight.value||
            !recipe.temp.value||
            !recipe.ingredients.value||
            !recipe.instructions.value

        ) {
            return toast.warn("Preencha todos os campos!");

        }

        if (onEdit) {
            await axios 
            .put("http://localhost:3001/" + onEdit.id, {
                name: recipe.name.value,
                language: recipe.language.value,
                oven: recipe.oven.value,
                mainIngredient: recipe.mainIngredient.value,
                dish: recipe.dish.value,
                weight: recipe.weight.value,
                temp: recipe.temp.value,
                ingredients: recipe.ingredients.value,
                instructions: recipe.instructions.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
        } 
        else{
            await axios
            .post("http://localhost:3001" , {
              name: recipe.name.value,
              language: recipe.language.value,
              oven: recipe.oven.value,
              mainIngredient: recipe.mainIngredient.value,
              dish: recipe.dish.value,
                weight: recipe.weight.value,
                temp: recipe.temp.value,
                ingredients: recipe.ingredients.value,
                instructions: recipe.instructions.value,  
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));

        }

        recipe.name.value = "";
        recipe.language.value = "";
        recipe.oven.value = "";
        recipe.mainIngredient.value = "";
        recipe.dish.value = "";
        recipe.dish.value = "";
        recipe.weight.value = "";
        recipe.temp.value = "";
        recipe.ingredients.value = "";
        recipe.instructions.value = "";

        setOnEdit(null);
        getRecipes();
        

    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            
            <InputArea>
            <InputArea1>
                <Label>Recipe Name</Label>
                <Input1 name="name" />
            </InputArea1>
            <InputArea1>
                <Label>Language</Label>
                <Input as="select" name="language">
                    <option value=" ">Select here</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="portuguese">Portuguese</option>
                </Input>
            </InputArea1>
            </InputArea>
            <InputArea>
            <InputArea2>
                <Label>Oven</Label>
                <Input as="select" name="oven">
                    <option value=" ">Select here</option>
                    <option value="FIT">FIT Express</option>
                    <option value="COPA">COPA Express</option>
                    <option value="FORZA">ROCKET Express</option>
                    </Input> 
                </InputArea2>
            <InputArea2>
                <Label>Main ingredient</Label>
                <Input as="select" name="mainIngredient">
                    <option value=" ">Select here</option>
                    <option value="flour">Flour</option>
                    <option value="eggs">Eggs</option>
                    <option value="meat">Meat</option>
                </Input>
                </InputArea2>
                <InputArea2>
                <Label>Dish type</Label>
                <Input as="select" name="dish">
                    <option value=" ">Select here</option>
                    <option value="baked">Baked</option>
                    <option value="fried">Fried</option>
                    <option value="roast">Roast</option>
                </Input>
                </InputArea2>
            </InputArea>
            <InputArea>
            <InputArea3>
                <Label>Weight (Grams)</Label>
                <Input name="weight" />
            </InputArea3>
            <InputArea3>
                <Label>Entry temp. (°C)</Label>
                <Input name="temp" />
            
                </InputArea3>
                <InputArea4>
                <Label>Assembly ingredients:</Label>
                <Input name="ingredients" />
            </InputArea4>
            <InputArea5>
                <Label>Operating instructions:</Label>
                <Input name="instructions" />
            </InputArea5>
            </InputArea>

            <Button type="Submit" onSubmit={handleSubmit}>SALVAR</Button>
            

        </FormContainer>
    );
}

export default Form;