import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 40%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.modalProperties.color};
  background-color: ${(props) => props.modalProperties.background};
  border-radius: 5px;
  font-weight: bolder;
  letter-spacing: 2px;
  z-index: 2;
`;

const ModalMessage = styled.div``;

const Modal = ({ modalProperties }) => {
  console.log(modalProperties);
  return (
    <Container modalProperties={modalProperties}>
      <ModalMessage>{modalProperties.message}</ModalMessage>
    </Container>
  );
};

export default Modal;
