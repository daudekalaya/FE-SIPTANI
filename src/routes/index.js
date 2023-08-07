import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homePage";
import KeranjangPage from "../pages/keranjang";
import KontakPage from "../pages/kontak";
import ProdukPage from "../pages/produk";
import ProdukDetailPage from "../pages/produkDetail";
import TentangPage from "../pages/tentang";
import TransaksiPage from "../pages/transaksi";
import CheckoutPage from "../pages/checkout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import AdminLayout from "../layouts/AdminLayout";
import Products from "../layouts/Products";
import AddProduct from "../layouts/AddProducts";
import EditProduct from "../layouts/EditProduct";
import axios from "axios";
import config from "../config/config";
import { CartContext } from "../pages/keranjang"

const AppRoutes = () => {
  const [cartData, setCartData] = useState([]);
  const [forceRender, setForceRender] = useState(false); // State sementara untuk memaksa render ulang
  const userData = JSON.parse(localStorage.getItem("user"));
  const username = userData?.username || ""; // Set username to an empty string if not available

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item of cartData) {
      totalItems += item.qty;
    }
    return totalItems;
  };

  const getCountCart = () => {
    const sessionId = localStorage.getItem("cartId");
    axios
      .get(config.ROOT_URL + "frontend/keranjang?session_id=" + sessionId)
      .then((result) => {
        const cartData = result.data.data;
        setCartData(cartData);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  useEffect(() => {
    getCountCart();
  }, []);

  // Fungsi ini akan dipanggil setiap kali ada perubahan pada data keranjang
  const handleCartUpdate = () => {
    getCountCart();
  };
  

  // Toggle forceRender saat isDashboardPage berubah
  const isDashboardPage = window.location.pathname.includes("/admin-dashboard");
  useEffect(() => {
    setForceRender(!isDashboardPage);
  }, [isDashboardPage]);

  return (
    <CartContext.Provider value={{ productData: cartData, setProduct: setCartData, resetCart: handleCartUpdate }}>
      <div>
        {forceRender ? (
          <Navbar
            cartCounter={getTotalCartItems()}
            cartData={cartData}
            onCartUpdate={setCartData}
          />
        ) : null}

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/produk" element={<ProdukPage />} />
          {/* Perbaikan di bawah ini */}
          <Route
            path="/produkDetail/:url"
            element={<ProdukDetailPage setCounter={getCountCart} />}
          />
          {/* Perbaikan di atas ini */}
          <Route path="/kontak" element={<KontakPage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/keranjang" element={<KeranjangPage setCounter={getCountCart} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/transaksi/:number" element={<TransaksiPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Route Admin-Dashboard */}
          <Route path="/admin-dashboard/*" element={<AdminLayout />} />
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} /> */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Routes>
        {forceRender ? <Footer /> : null}
      </div>
    </CartContext.Provider>
  );
};

export default AppRoutes;