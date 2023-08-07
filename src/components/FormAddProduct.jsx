// FormAddProduct.js

import React, { useState } from "react";
import axios from "axios";
import config from "../config/config";

const FormAddProduct = ({ onProductAdded }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    full_description: "",
    image: null,
    price: 0,
    category_id: 0,
  });
  const [msg, setMsg] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      if (e.target.files && e.target.files.length > 0) {
        setFormValues({ ...formValues, [name]: e.target.files[0] });
      } else {
        setFormValues({ ...formValues, [name]: null });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in formValues) {
        formData.append(key, formValues[key]);
      }

      await axios.post(config.ROOT_URL + "produk", formData);
      onProductAdded();
      setFormValues({
        title: "",
        description: "",
        full_description: "",
        image: null,
        price: 0,
        category_id: 0,
      });
      setMsg("");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">Products</h1>
      <h2 className="text-lg text-gray-600 mb-4">Add New Product</h2>
      <div className="bg-white shadow rounded p-4">
        <div className="space-y-4">
          <form onSubmit={saveProduct}>
            <p className="text-center text-red-600">{msg}</p>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Title</label>
              <input
                type="text"
                className="border rounded py-2 px-3 mt-1"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                placeholder="Product Title"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>
              <input
                type="text"
                className="border rounded py-2 px-3 mt-1"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Full Description
              </label>
              <textarea
                className="border rounded py-2 px-3 mt-1"
                name="full_description"
                value={formValues.full_description}
                onChange={handleInputChange}
                placeholder="Full Description"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Image</label>
              <input
                type="file"
                className="border rounded py-2 px-3 mt-1"
                name="image"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Price</label>
              <input
                type="number"
                className="border rounded py-2 px-3 mt-1"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                placeholder="Price"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Category ID
              </label>
              <input
                type="number"
                className="border rounded py-2 px-3 mt-1"
                name="category_id"
                value={formValues.category_id}
                onChange={handleInputChange}
                placeholder="Category ID"
                required
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
