import React, { useState, useEffect } from "react";
import { FaCity } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import config from "../config/config";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const submitForm = (event) => {
    event.preventDefault();
    const sessionId = localStorage.getItem("cartId");
    axios
      .post(config.ROOT_URL + "frontend/checkout?session_id=" + sessionId, formData)
      .then((result) => {
        if (result.data.code === 200) {
          console.log("Form berhasil dikirim");
          navigate("/transaksi/" + result.data.data.trs_number);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    const sessionId = localStorage.getItem("cartId");
    axios
      .get(config.ROOT_URL + "frontend/keranjang?session_id=" + sessionId)
      .then((result) => {
        const cartData = result.data.data;
        if (cartData.length === 0) {
          navigate("/"); // Mengarahkan pengguna kembali ke halaman utama jika data keranjang kosong
          alert("Kamu belum memiliki keranjang"); // Tampilkan pesan bahwa pengguna belum memiliki keranjang
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  // Cek apakah data keranjang kosong, jika iya, tidak perlu render halaman Checkout
  if (formData.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 pt-16">
        <div className="container mx-auto p-4 md:p-8 lg:p-16 bg-gray-100 rounded-lg">
          <form onSubmit={submitForm} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="first_name"
                placeholder="Nama Depan"
                onChange={handleInputChange}
                value={formData.first_name}
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="mt-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mt-4 md:mt-0">
                <h4 className="text-lg text-greenFarm font-semibold mt-3">Metode Pembayaran</h4>
                <div className="flex items-center mt-2">
                  <FaCity className="text-xl text-greenFarm mr-2" />
                  <span>Bank Transfer</span>
                </div>
                <p className="text-sm text-gray-500">
                  Bank Boke an. Daud Ekalaya No. 123456789
                </p>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="last_name"
                placeholder="Nama Belakang"
                onChange={handleInputChange}
                value={formData.last_name}
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              />
              <textarea
                name="address"
                placeholder="Alamat Pengiriman"
                onChange={handleInputChange}
                value={formData.address}
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 mt-4"
              ></textarea>
              <input
                type="text"
                name="phone"
                placeholder="Telp"
                onChange={handleInputChange}
                value={formData.phone}
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 mt-4"
              />
            </div>
          </form>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-greenFarm hover:bg-greenFarmHover text-white px-6 py-3 rounded-lg text-xl w-full md:w-auto"
              onClick={submitForm}
            >
              Proses Pembayaran
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
