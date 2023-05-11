import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import './styles.css';

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

const Container = styled.div`
  width:100%;
  max-width: 800px;
  margin-top: 20px;
  flex-direction: column;
  align-itens: center;
  gap: 10px;
`;
const Modal_Overlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;
const Title = styled.h2``;

function App(props) {
  const [recipes, setRecipes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  

  const getRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:3001");
      setRecipes(res.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
        }

  useEffect(() => {
    getRecipes();
  }, [setRecipes]);


  return (
  <>      
      <Container>
      <div className="title">
      <Title>Cookbook</Title>
      <button className="btRecipe">Import recipes</button>
      <button className="btRecipe">Copy recipes</button>
      <button className="btRecipe" onClick={openModal}>create recipes</button>
      </div>
      {isOpen &&  
      <div>
      <Modal_Overlay onClick={closeModal}/>
              <div className="modal">
                <div className="modalTitle">
                  Create new recipe
                  <button className="X" onClick={closeModal}>X</button>
                  </div>      
                  
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getRecipes={getRecipes} className="form"/>
      <button onClick={closeModal}>Cancelar</button>
      </div>  
      </div>
        }
      <Grid recipes={recipes} setRecipes={setRecipes} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
      <GlobalStyle/>
    </>
  );
}

export default App;
