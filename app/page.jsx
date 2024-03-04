"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListProducts from "../components/products/ListProducts";

const getProducts = async () => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/api/products`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const HomePage = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    (async () => setProductsData(await getProducts()))();
  }, []);

  return <ListProducts data={productsData} />;
};

export default HomePage;
