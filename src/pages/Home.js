import React, { useContext, useEffect, useState } from "react";
import useFetchHook from "../hooks/useFetchHook";
import styled from "styled-components";
import Products from "../components/Products";
import AppContext from "../context/AppContext";
import Modal from "../components/Modal";
import PopupModal from "../components/PopupModal";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  max-width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Right = styled.div`
  flex: 1;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 50px;
`;

const PopupContainer = styled.div`
  height: 100%;
  width: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const WrapperModal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const PopupModalContainer = styled.div`
  height: 80%;
  width: 80%;
  z-index: 2;
`;
const PopupModalButtons = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Icon = styled.div``;

const Home = () => {
  const [modalChange, setModalChange] = useState(false);
  const { products } = useFetchHook("http://localhost:3001/products");
  const { addedProducts, count, availableItems } = useContext(AppContext);
  const [productId2, setProductId2] = useState(0);
  const [popupChange, setPopUpChange] = useState(false);
  const [modalProperties, setModalProperties] = useState({
    message: "",
    color: "",
    background: "",
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setModalChange(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [productId2]);

  const modalFeatureChanges = (message = "", color = "", background = "") => {
    setModalProperties({
      ...modalProperties,
      message: message,
      color: color,
      background: background,
    });
  };

  return (
    <>
      {popupChange && (
        <PopupContainer>
          <WrapperModal>
            <PopupModalContainer>
              <PopupModal setPopUpChange={setPopUpChange}></PopupModal>
            </PopupModalContainer>
            <PopupModalButtons>
              <Icon>1</Icon>
              <Icon>2</Icon>
            </PopupModalButtons>
          </WrapperModal>
        </PopupContainer>
      )}
      <Container>
        {modalChange && (
          <ModalContainer>
            <Modal modalProperties={modalProperties} />
          </ModalContainer>
        )}
        <Wrapper>
          <Left>
            {availableItems?.map((product, index) => {
              return (
                <Products
                  key={product.id}
                  product={product}
                  setModalChange={setModalChange}
                  modalFeatureChanges={modalFeatureChanges}
                  setProductId2={setProductId2}
                  setPopUpChange={setPopUpChange}
                  popupChange={popupChange}
                />
              );
            })}
          </Left>
          <Right></Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default Home;
