import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom"
const Container = styled.div`
  height: 70px;
`;

const Wrapper = styled.div`
  padding: 0px 10px;
  display: flex;
`;

const Left = styled.div`
  flex: 1;
`;
const Title = styled.h1``;

const Center = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const RouteContainer = styled.div`
  display: flex;
  gap: 10px;
  &>a{
    text-decoration: none;
    font-size: 25px;
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Ecom</Title>
        </Left>
        <Center></Center>
        <Right>
          <RouteContainer>
            <NavLink style={({isActive})=>{return{color:isActive?"blue":"black"}}} to="/">Home</NavLink>
            <NavLink style={({isActive})=>{return{color:isActive?"blue":"black"}}} to="/cart">Cart</NavLink>
          </RouteContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
