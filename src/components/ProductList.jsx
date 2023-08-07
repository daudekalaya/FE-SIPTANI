import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config/config";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(config.ROOT_URL + "produk");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(config.ROOT_URL + `produk/${productId}`);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Products</h1>
      <h2 className="text-lg mb-4">List of Products</h2>
      <Link
        to="/products/add"
        className="bg-blue-500 text-white py-2 px-4 rounded mb-2 inline-block"
      >
        Add New
      </Link>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Created By</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">{product.image}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">product.user.name</td>
              <td className="border px-4 py-2">
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
