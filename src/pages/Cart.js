import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  gap: 30px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  height: 160px;
  max-width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 20px;
`;
const CostContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  padding: 10px 20px;
  border-top: 1px solid black;
`;
const CostContainerTitle = styled.div`
  font-size: 30px;
`;
const CostContainerValue = styled.div`
  font-size: 30px;
`;
const ContentContainerTotal = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  gap: 30px;
`;
const CostContainerButton = styled.div`
  display: flex;
  flex: 1;
`;

const CostContainerBtn = styled.button`
  padding: 10px;
  letter-spacing: 3px;
  border: none;
  background-color: lightblue;
  border-radius: 4px;
  cursor: pointer;
`;
const Image = styled.img`
  height: 80%;
  object-fit: cover;
`;
const ContentContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  height: 80%;
  margin-left: 10px;
`;
const ProductName = styled.div`
  font-size: 20px;
`;
const ProductFooter = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 20px;
  align-items: center;
`;
const ProductCost = styled.div`
  font-size: 30px;
`;

const ProductQuantity = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  flex-direction: column;
  width: 40px;
  justify-content: center;
`;

const ProductQuantityControl = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 30px;
`;
const Empty = styled.div`
  width: 100%;
  font-size: 30px;
  letter-spacing: 2px;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Cart = () => {
  const { addedProducts, dispatch, totalCost } = useContext(AppContext);
  const handleQuantity = (direction = "", id, quantity = 0) => {
    if (direction === "U") {
      dispatch({ type: "INCREASE_COST", payload: id });
      dispatch({ type: "GET_TOTAL" });
    } else if (direction === "D") {
      if (quantity < 2) {
        dispatch({ type: "REMOVE_ITEM", payload: id });
        dispatch({ type: "GET_TOTAL" });
      } else {
        dispatch({ type: "DECREASE_COST", payload: id });
        dispatch({ type: "GET_TOTAL" });
      }
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: id });
      dispatch({ type: "GET_TOTAL" });
    }
  };

  const deleteAllItems = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  if (addedProducts.length === 0) {
    return <Container>
      <Empty>Cart is empty.</Empty>
    </Container>;
  }

  return (
    <Container>
      {addedProducts.map((product, index) => {
        return (
          <Wrapper>
            <Image src={product.image} />
            <ContentContainer>
              <ProductName>{product.model}</ProductName>
              <ProductName>{product.company}</ProductName>
              <ProductFooter>
                <ProductCost>${product.price}</ProductCost>
                <i
                  onClick={() => handleQuantity("", product.id, 0)}
                  className="fa fa-solid fa-trash"
                ></i>
              </ProductFooter>
            </ContentContainer>
            <ProductQuantity>
              <i
                onClick={() =>
                  handleQuantity("U", product.id, product.quantity)
                }
                className="fa fa-solid fa-caret-up"
              ></i>
              {product.quantity}
              <i
                onClick={() =>
                  handleQuantity("D", product.id, product.quantity)
                }
                className="fa fa-solid fa-caret-down"
              ></i>
            </ProductQuantity>
          </Wrapper>
        );
      })}
      <CostContainer>
        <CostContainerButton>
          <CostContainerBtn onClick={deleteAllItems}>
            Clear Cart<i className="fa fa-solid fa-trash"></i>
          </CostContainerBtn>
        </CostContainerButton>
        <ContentContainerTotal>
          <CostContainerTitle>Total:</CostContainerTitle>
          <CostContainerValue>{totalCost || 0}</CostContainerValue>
        </ContentContainerTotal>
      </CostContainer>
    </Container>
  );
};

export default Cart;
