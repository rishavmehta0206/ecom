import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  height: 100%;
  width: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.modalProperties.color)};
  background-color: ${(props) => (props.modalProperties.background)};
`;

const ModalMessage = styled.div``;

const Modal = ({ modalProperties }) => {
    console.log(modalProperties)
  return (
    <Container modalProperties={modalProperties}>
      <ModalMessage>{modalProperties.message}</ModalMessage>
    </Container>
  );
};

export default Modal;
