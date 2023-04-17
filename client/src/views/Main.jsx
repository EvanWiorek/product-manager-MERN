import React, { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import axios from "axios";
import '../App.css'

export default (props) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  });

  const removeFromDom = productId => {
    setProducts(products.filter(product => product._id != productId));
}

  return (
    <div className="m-auto card border-info p-3 mt-3 col-5">
      <div className="m-auto col-10">
        <h1 className="text-center mt-3">Product Manager</h1>
        <ProductForm />
        <hr />
        {loaded && <ProductList products={products} removeFromDom={removeFromDom} />}
      </div>
    </div>
  );
};
