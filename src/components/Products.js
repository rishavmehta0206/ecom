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

const Products = (props) => {
  const { addedProducts, dispatch } = useContext(AppContext);
  const [productId, setProductId] = useState(0);
  const [wishlist, setWishlist] = useState(false);

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
      props.modalFeatureChanges("Item present in cart.", "white", "green");
      props.setProductId2((prev) => prev - 1);
    } else {
      setProductId(id);
      props.modalFeatureChanges("Item saved.", "white", "green");
      props.setProductId2((prev) => prev + 1);
    }
    props.setModalChange(true);
  };
  const addToWishList = useCallback(() => {
    setWishlist(!wishlist);
    if (!wishlist) {
      props.modalFeatureChanges("Item added to wishlist.", "white", "green");
      props.setProductId2((prev) => prev + 1);
    } else {
      props.modalFeatureChanges("Item removed from wishlist.", "white", "green");
      props.setProductId2((prev) => prev - 1);
    }
    props.setModalChange(true);
  }, [wishlist]);


  const sendDataToPopUpModal = (id) => {
    props.setPopUpChange(!props.popupChange)
    dispatch({type:"FETCH_SINGLE_ITEM",payload:id})
  }

  return (
    <Container>
      <Wrapper>
        <Image onClick={() => sendDataToPopUpModal(props.product.id)} src={props.product.image} />
        <DetailContainer>
          <ProductAbout>{props.product.about}</ProductAbout>
          <CardFooter>
            <CardFooterDetails>
              <div>{props.product.model}</div>
              <div>{props.product.company}</div>
              <div>${props.product.price}</div>
            </CardFooterDetails>
            <CardFooterButtons>
              <Icon
                onClick={() => {
                  addItemToCart(props.product.id);
                }}
              >
                <i className="fa fa-solid fa-cart-shopping"></i>
              </Icon>
              <Icon>
                <i className="fa fa-solid fa-eye"></i>
              </Icon>
              <Icon onClick={addToWishList}>
                <i
                  style={{ color: wishlist ? "red" : "black" }}
                  className="fa fa-solid fa-heart"
                ></i>
              </Icon>
            </CardFooterButtons>
          </CardFooter>
        </DetailContainer>
      </Wrapper>
    </Container>
  );
};

export default React.memo(Products);
