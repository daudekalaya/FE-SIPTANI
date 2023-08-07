import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import ProductList from "../components/ProductList";

const Products = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Implementasikan logika autentikasi Anda di sini jika diperlukan
    // Contoh: Periksa apakah pengguna terautentikasi, dan jika tidak, arahkan ke halaman login
    const isAuthenticated = true; // Ganti dengan logika autentikasi Anda
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="p-6">
        <ProductList />
      </div>
    </AdminLayout>
  );
};

export default Products;
