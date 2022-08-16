import styled from "styled-components";
import { useCallback, useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import React from "react";
import axios from "axios";
const Container = styled.div`
  height: 260px;
  width: 100%;
`;
const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  gap: 30px;
  align-items: center;
`;
const Image = styled.img`
  height: 60%;
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const DetailContainer = styled.div`
  width: 100%;
  padding: 0px 10px;
`;

const ProductAbout = styled.div`
  font-size: 20px;
  margin-bottom: 18px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  align-items: center;
`;
const CardFooterDetails = styled.div``;
const CardFooterButtons = styled.div`
  display: flex;
  gap: 30px;
`;

const Icon = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: lightgray;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Products = ({
  id,
  company,
  category,
  model,
  image,
  price,
  quantity,
  description,
  about,
  setModalChange,
  modalFeatureChanges,
  setProductId2,
}) => {
  const { addedProducts, dispatch } = useContext(AppContext);
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    if (productId > 0) {
      const fetchData = async () => {
        const response = await axios.get(
          `http://localhost:3001/products?id=${productId}`
        );
        console.log(response.data);
        dispatch({ type: "SINGLE_ITEM", payload: response.data });
        dispatch({ type: "GET_TOTAL" });
      };
      fetchData();
    }
  }, [productId, dispatch]);
  const addItemToCart = (id) => {
    console.log("called callback");
    if (
      addedProducts.find((product) => {
        return product.id === id;
      })
    ) {
      modalFeatureChanges("Item present in cart.", "white", "green");
      setProductId2((prev) => prev - 1);
    } else {
      setProductId(id);
      modalFeatureChanges("Item saved.", "white", "green");
      setProductId2((prev) => prev + 1);
    }
    setModalChange(true);
  };
  return (
    <Container>
      <Wrapper>
        <Image src={image} />
        <DetailContainer>
          <ProductAbout>{about}</ProductAbout>
          <CardFooter>
            <CardFooterDetails>
              <div>{model}</div>
              <div>{company}</div>
              <div>${price}</div>
            </CardFooterDetails>
            <CardFooterButtons>
              <Icon
                onClick={() => {
                  addItemToCart(id);
                }}
              >
                <i className="fa fa-solid fa-cart-shopping"></i>
              </Icon>
              <Icon>
                <i className="fa fa-solid fa-eye"></i>
              </Icon>
            </CardFooterButtons>
          </CardFooter>
        </DetailContainer>
      </Wrapper>
    </Container>
  );
};

export default React.memo(Products);
