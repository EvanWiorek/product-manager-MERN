import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const goBackLink = () => {
    navigate(-1);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <div className="col-5 d-flex m-auto">
      <div className="mt-5">
        <button className="btn btn-outline-success" onClick={goBackLink}>Go Back</button>
      </div>
      <div className="m-auto mt-5">
        <div className="card border-info product-container m-auto">
          <div className="card-header text-center align-items-center d-flex justify-content-between">
            {product.title}{" "}
            <div className="buttons justify-content-end d-flex gap-3 m-3">
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-outline-warning"
              >
                Edit
              </Link>
              {/* <button
                className="btn btn-outline-danger"
                onClick={(e) => {
                  deleteProduct(product._id);
                }}
              >
                Delete
              </button> */}
            </div>
          </div>
          <div className="card-body d-flex gap-5">
            <div className="left-side">
              <p>Price: </p>
              <p>Description: </p>
            </div>
            <div className="right-side">
              <p>${product.price}</p>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
