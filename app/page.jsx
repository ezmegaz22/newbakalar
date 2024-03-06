"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListProducts from "../components/products/ListProducts";

import queryString from "query-string";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  console.log("searchQuery", searchQuery);

  try {
    const { data } = await axios.get(
      `${process.env.API_URL}/api/products?${searchQuery}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const HomePage = ({ searchParams }) => {
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    (async () => setProductsData(await getProducts(searchParams)))();
  }, [searchParams]);
  
  return <ListProducts productsData={productsData} />;
};

export default HomePage;
