"use client";

import React from "react";
import Filters from "../layouts/Filters";
import ProductItem from "./ProductItem.jsx";
import CustomPagination from "../layouts/CustomPagination";

const ListProducts = ({ productsData }) => {
  if(!productsData) return null;

  const {resPerPage, filteredProductsCount, products} = productsData;

  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />

          <main className="md:w-2/3 lg:w-3/4 px-3">
            {products?.map((product) => (
              <ProductItem key={product?._id} product={product} />
            ))}
            <CustomPagination
              resPerPage={resPerPage}
              productsCount={filteredProductsCount}
            />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
