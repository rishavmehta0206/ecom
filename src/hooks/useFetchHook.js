import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const useFetchHook = (API_URL) => {
  const [products, setProducts] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      localStorage.setItem("products", JSON.stringify(response.data));
      setProducts(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [API_URL, fetchData]);
  return { products };
};

export default useFetchHook;
