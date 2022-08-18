import React, { useContext, useState } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 9px 0px black;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;
const ModalButtons = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 10px;
  top: 10px;
  opacity: 0.7;
  background-color: lightgray;
`;

const ModalContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;
const ModalImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const ModalImage = styled.img`
  object-fit: cover;
`;
const ModalContentContainer = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
`;
const ModalContentText = styled.div`
    height: 30px;
    font-size: 30px;
`;
const PopupModal = (props) => {
  const closePopUp = () => {
    props.setPopUpChange(false);
  };
  const { fetchSingle } = useContext(AppContext);
  console.log(fetchSingle);
  return (
    <Container>
      <Wrapper>
        <ModalButtons onClick={closePopUp}>
          <i className="fa fa-solid fa-skull-crossbones"></i>
        </ModalButtons>
        <ModalContainer>
          <ModalImageContainer>
            <ModalImage src={fetchSingle.image} />
          </ModalImageContainer>
          <ModalContentContainer>
            <ModalContentText>{fetchSingle.company}</ModalContentText>
          </ModalContentContainer>
        </ModalContainer>
      </Wrapper>
    </Container>
  );
};

export default PopupModal;
