import React, { useState, useEffect } from "react";
import farmImage from "../assets/farmImage.png";
import cabaiRawit from "../assets/francesco-gallarotti-ruQHpukrN7c-unsplash 1.png";
import logo from "../assets/logo.png";
import ProdukItem from "../components/ProdukItem";
import config from "../config/config";
import formatRupiah from "../libs/formatRupiah";
import axios from "axios";

function Produk() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(config.ROOT_URL + "frontend/produkPage")
      .then((result) => {
        const product = result.data.data;
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Lakukan penanganan kesalahan jika permintaan gagal
      });
  }, []);

  return (
    <React.Fragment>
      <div className="py-8 mt-20">
        {/* Input Pencarian */}
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Cari produk..."
            className="border border-gray-300 px-4 py-2 rounded-md w-64 md:w-96"
          />
          <button className="ml-2 px-4 py-2 bg-greenFarm text-white rounded-md">
            Cari
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 md:px-20 lg:px-64 my-10">
        {product.map((product) => (
          <ProdukItem
            image={config.ROOT_URL + "public/" + product.image}
            title={product.title}
            price={formatRupiah(product.price)}
            action={product.url}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Produk;
