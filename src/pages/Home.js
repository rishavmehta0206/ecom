import React, { useContext, useEffect, useState } from "react";
import useFetchHook from "../hooks/useFetchHook";
import styled from "styled-components";
import Products from "../components/Products";
import AppContext from "../context/AppContext";
import Modal from "../components/Modal";

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

const Home = () => {
  const [modalChange, setModalChange] = useState(false);
  const { products } = useFetchHook("http://localhost:3001/products");
  const { addedProducts, count } = useContext(AppContext);
  const [productId2, setProductId2] = useState(0);

  const [modalProperties, setModalProperties] = useState({
    message: "",
    color: "",
    background: "",
  });

  useEffect(() => {
    console.log("called");
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
    <Container>
      {modalChange && (
        <ModalContainer>
          <Modal modalProperties={modalProperties} />
        </ModalContainer>
      )}
      <Wrapper>
        <Left>
          {products?.map((product, index) => {
            return (
              <Products
                key={product.id}
                {...product}
                setModalChange={setModalChange}
                modalFeatureChanges={modalFeatureChanges}
                setProductId2={setProductId2}
              />
            );
          })}
        </Left>
        <Right></Right>
      </Wrapper>
    </Container>
  );
};

export default Home;
