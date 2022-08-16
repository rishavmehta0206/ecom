import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AppContext from "../context/AppContext";
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
  position: relative;
  display: flex;
  gap: 10px;
`;

const Routes = styled.div`
  padding: 5px;
  & > a {
    text-decoration: none;
    letter-spacing: 2px;
    font-size: 25px;
    font-weight: bold;
  }
`;
const Quantity = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: lightgray;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  top: -10px;
  right: -10px;
`;

const Navbar = () => {
  const { count } = useContext(AppContext);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Ecom</Title>
        </Left>
        <Center></Center>
        <Right>
          <RouteContainer>
            <Routes>
              <NavLink
                style={({ isActive }) => {
                  return { color: isActive ? "blue" : "black" };
                }}
                to="/"
              >
                Home
              </NavLink>
            </Routes>
            <Routes>
              <Quantity>{count}</Quantity>
              <NavLink
                style={({ isActive }) => {
                  return { color: isActive ? "blue" : "black" };
                }}
                to="/cart"
              >
                Cart
              </NavLink>
            </Routes>
          </RouteContainer>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
