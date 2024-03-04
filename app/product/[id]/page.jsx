"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "@/components/products/ProductDetails";

const ProductDetailsPage = ({ params }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}/api/products/${params.id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    getProductDetails();
  }, [params.id]);

  console.log(product);

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
