import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default ({ products, removeFromDom }) => {
  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/product/${productId}`)
      .then((res) => {
        removeFromDom(productId);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="col-10 m-auto">
      <table className="table table-bordered table-hover my-shadow">
        <thead>
          <tr>
            <th scope="col">
              <h5 className="p-2">All Products</h5>
            </th>
            <th scope="col">
              <h5 className="p-2">Actions</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td className="p-3">
                <h5>
                  <Link to={`/product/${product._id}`}>{product.title}</Link>
                </h5>
              </td>
              <td className="p-3">
                <p className="d-flex gap-3">
                  <Link
                    to={`/product/${product._id}/edit`}
                    className="btn btn-outline-warning"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => {
                      deleteProduct(product._id);
                    }}
                  >
                    Delete
                  </button>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
