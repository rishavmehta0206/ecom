import { useReducer } from "react";
import React from "react";
import AppContext from "./AppContext";

const reducerFun = (state, action) => {
  switch (action.type) {
    case "SINGLE_ITEM": {
      let newItems = [...action.payload, ...state.addedProducts];
      console.log(newItems);
      return { ...state, addedProducts: newItems, count: state.count + 1 };
    }
    case "INCREASE_COST": {
      let newItems = state.addedProducts.map((product, index) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      return { ...state, addedProducts: newItems };
    }
    case "DECREASE_COST": {
      let newItems = state.addedProducts.map((product, index) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
      return { ...state, addedProducts: newItems };
    }
    case "REMOVE_ITEM": {
      let newItems = state.addedProducts.filter((product, index) => {
        return product.id !== action.payload;
      });
      return { ...state, addedProducts: newItems };
    }
    default:
      return { ...state };
  }
};
const initialState = {
  addedProducts: [],
  count: 0,
  totalCost: 0,
};

const AppReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFun, initialState);
  return (
    <AppContext.Provider
      value={{
        addedProducts: state.addedProducts,
        dispatch,
        count: state.count,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppReducer;