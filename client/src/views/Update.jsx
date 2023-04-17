import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const navigate = useNavigate();

  const goBackLink = () => {
    navigate(-1);
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/product/${id}`).then((res) => {
      setTitle(res.data.title);
      setPrice(res.data.price);
      setDescription(res.data.description);
    });
  }, []);

  let formIsValid = false;
  formIsValid =
    titleError === null && priceError === null && descriptionError === null;

  const handleTitle = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length < 1) {
      setTitleError("Title must not be blank.");
    } else {
      setTitleError(null);
    }
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    if (e.target.value.length < 1) {
      setPriceError("Price must not be blank.");
    } else if (isNaN(e.target.value) === true) {
      setPriceError("Price must be a number.");
    } else {
      setPriceError(null);
    }
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length < 1) {
      setDescriptionError("Description must not be blank.");
    } else {
      setDescriptionError(null);
    }
  };

  const updateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/product/${id}`, {
        title,
        price,
        description,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

      setTitle("");
      setPrice("");
      setDescription("");
  };

  return (
  <div className="card border-info mt-5 col-4 p-4 m-auto">
    <div>
        <h1>Update {title}</h1>
      <form onSubmit={updateProduct} className="m-auto mt-4">
        <div className="form-floating">
          <input
            type="text"
            onChange={handleTitle}
            value={title}
            className="form-control mt-4"
            placeholder="Title"
          />
          <label>Title</label>
          {titleError ? <p style={{ color: "tomato" }} className="mt-2">{titleError}</p> : ""}
        </div>
        <div className="form-floating">
          <input
            type="text"
            onChange={handlePrice}
            value={price}
            className="form-control  mt-4"
            placeholder="Price"
          />
          <label>Price</label>
          {priceError ? <p style={{ color: "tomato" }} className="mt-2">{priceError}</p> : ""}
        </div>
        <div className="form-floating">
          <input
            type="text"
            onChange={handleDescription}
            value={description}
            className="form-control  mt-4"
            placeholder="Description"
          />
          <label>Description</label>
          {descriptionError ? (
            <p style={{ color: "tomato" }} className="mt-2">{descriptionError}</p>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex align-items-center gap-3 mt-4">
          <input
            type="submit"
            className={`btn btn-outline-primary ${formIsValid ? "" : "disabled"}`}
          />
          <button className="btn btn-outline-success" onClick={goBackLink}>Go Back</button>
        </div>
      </form>
    </div>
  </div>
  )
};
