import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100vw;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1000px;
    margin: 20px 0;
    word-break: break-all;
`;

export const Thead = styled.thead`
width: 100vw;
`;
export const Tbody = styled.tbody`
width: 100vw;`;
export const Tr = styled.tr`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 100vw;
    margin: 20px auto;
    word-break: break-all;
`;


export const Td = styled.td`
    padding-top: 15px;
    width: 600px;
   
    
    `;
    /*text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
`*/
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`

const Grid = ({recipes, setRecipes, setOnEdit}) => {

    const handleEdit = (item) =>{
        setOnEdit(item);
    }

    const handleDelete = async (id) => {
        await axios
        .delete("http://localhost:3001/"+ id)
        .then(({ data }) => {
            const newArray = recipes.filter((recipes) => recipes.id !== id);

            setRecipes(newArray);
            toast.success(data);
        })
        .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Recipe Name</Th>
                    <Th>Language</Th>
                    <Th>Oven</Th>
                    <Th>Main ingredient</Th>
                    <Th>Dish type</Th>
                    <Th>Weight (grams)</Th>
                    <Th>Temp. (°C)</Th>
                    
                    <Th>Ingredients:</Th>
                    <Th>Instructions:</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {recipes.map((item,i) =>(
                    <Tr key={i}>        
                        <Td width="8%">{item.name}</Td>
                        <Td width="8%">{item.language}</Td>
                        <Td width="8%">{item.oven}</Td>
                        <Td width="8%">{item.mainIngredient}</Td> 
                        <Td width="8%">{item.dish}</Td> 
                        <Td width="8%">{item.weight}</Td> 
                        <Td width="8%">{item.temp}</Td>
                        <Td width="8%">{item.ingredients}</Td> 
                        <Td width="8%">{item.instructions}</Td>  
                         
                        <Td  width="4%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                             </Td>   
                             <Td  width="4%">
                            <FaTrash onClick={() => handleDelete(item.id)}/>
                             </Td>             
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;