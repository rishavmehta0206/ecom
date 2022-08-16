import React, { useContext, useState } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";

const Container = styled.div`
  height: 40px;
  width: 100%;
`;
const Wrapper = styled.div`
  height: 100%;
  max-width: 100%;
  padding: 0px 5px;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  height: 100%;
`;

const MenuTextDropDownText = styled.div`
  letter-spacing: 2px;
  margin-bottom: 10px;
  padding: 10px;
  &:hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;
const MenuTextDropDown = styled.div`
  padding: 10px;
  display: none;
  position: absolute;
  min-width: 160px;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const MenuItem = styled.div`
  position: relative;
  &:hover ${MenuTextDropDown} {
    display: block;
  }
`;
const MenuText = styled.div`
  letter-spacing: 2px;
`;

const Category = () => {
  const { dispatch } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    dispatch({ type: "CATEGORY", payload: category });
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Menu>
            <MenuItem>
              <MenuText>
                Category ({selectedCategory})
                <i className="fa fa-solid fa-angle-down"></i>
              </MenuText>
              <MenuTextDropDown>
                <MenuTextDropDownText onClick={() => filterByCategory("all")}>
                  All
                </MenuTextDropDownText>
                <MenuTextDropDownText onClick={() => filterByCategory("phone")}>
                  Phone
                </MenuTextDropDownText>
                <MenuTextDropDownText
                  onClick={() => filterByCategory("laptop")}
                >
                  Laptop
                </MenuTextDropDownText>
              </MenuTextDropDown>
            </MenuItem>
          </Menu>
        </Wrapper>
      </Container>
    </>
  );
};

export default Category;
