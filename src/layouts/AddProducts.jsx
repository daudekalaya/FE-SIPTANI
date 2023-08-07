import React, { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import FormAddProduct from "../components/FormAddProduct";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Implementasikan logika pengecekan autentikasi Anda di sini
    // Misalnya, periksa apakah pengguna sudah terautentikasi atau belum
    // Jika belum terautentikasi, navigasikan ke halaman login
    // Untuk saat ini, mari kita anggap Anda memiliki fungsi isAuthenticated() yang melakukan pengecekan autentikasi
    // if (!isAuthenticated()) {
    //   navigate("/");
    // }
  }, [navigate]);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <FormAddProduct />
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
