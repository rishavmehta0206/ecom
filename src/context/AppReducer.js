import { useReducer } from "react";
import React from "react";
import AppContext from "./AppContext";

const reducerFun = (state, action) => {
  switch (action.type) {
    case "FETCH_SINGLE_ITEM": {
      let findProductById = state.availableItems.find((product) => {
        return product.id === action.payload;
      });
      return { ...state, fetchSingle: findProductById };
    }
    case "SINGLE_ITEM": {
      let newItems = [...action.payload, ...state.addedProducts];
      let newCost = action.payload.price;
      return {
        ...state,
        addedProducts: newItems,
        count: state.count + 1,
        totalCost: newCost,
      };
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
      return { ...state, addedProducts: newItems, count: state.count - 1 };
    }
    case "CLEAR_CART": {
      return { ...state, addedProducts: [], count: 0 };
    }
    case "CATEGORY": {
      state.availableItems = JSON.parse(localStorage.getItem("products"));
      let newItems = state.availableItems?.filter((product) => {
        if (action.payload === "all") {
          return product;
        }
        return product.category == action.payload;
      });
      return { ...state, availableItems: newItems };
    }
    case "GET_TOTAL": {
      const { totalCost, count } = state.addedProducts.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalCost += itemTotal;
          cartTotal.count += quantity;
          return cartTotal;
        },
        {
          count: 0,
          totalCost: 0,
        }
      );
      return { ...state, totalCost: totalCost };
    }
    default:
      return { ...state };
  }
};
const initialState = {
  availableItems: JSON.parse(localStorage.getItem("products")),
  addedProducts: [],
  count: 0,
  totalCost: 0,
  fetchSingle: {},
};

const AppReducer = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFun, initialState);
  return (
    <AppContext.Provider
      value={{
        addedProducts: state.addedProducts,
        dispatch,
        totalCost: state.totalCost,
        count: state.count,
        availableItems: state.availableItems,
        fetchSingle:state.fetchSingle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppReducer;
