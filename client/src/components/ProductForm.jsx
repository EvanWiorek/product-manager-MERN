import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  //   const [productInfo, setProductInfo] = useState({
  //     title: "",
  //     price: "",
  //     description: ""
  //   });

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    //make a post request to create a new product
    axios
      .post("http://localhost:8000/api/newproduct", {
        title,
        price,
        description,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setTitle("");
    setPrice("");
    setDescription("");
  };

  //onChange to update title and price
  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-auto mt-4">
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
        <input
          type="submit"
          className={`btn btn-outline-primary mt-4 ${formIsValid ? "" : "disabled"}`}
        />
      </form>
    </div>
  );
};
