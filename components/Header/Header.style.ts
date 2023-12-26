import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: #1a1a1a;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  box-sizing: border-box;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }

  form {
    display: flex;
    align-items: center;

    input {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      margin-right: 0.5rem;
      width: 200px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #ff4500; /* Cor de destaque laranja */
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    form {
      margin-top: 1rem;
    }
  }
`;

export const ResultsContainer = styled.div`
  background: #333; /* Cor de fundo escura para os resultados */
  color: #fff; /* Cor do texto claro nos resultados */
  padding: 1rem;
`;

export const MoviePosterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const MoviePoster = styled.div`
  margin: 1rem;
  border: 2px solid #333; /* Cor da borda escura */
  border-radius: 4px;
  overflow: hidden;
  width: 100px;
  height: 150px;
  flex-shrink: 0; /* Impede que as imagens diminuam demais */
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;

  h2 {
    margin-top: 0;
    font-size: 1.5rem;
  }

  p {
    margin-top: 8px;
    font-size: 1rem;
  }

  iframe {
    margin-top: 16px;
    width: 100%;
    height: 315px;
  }

  button {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
