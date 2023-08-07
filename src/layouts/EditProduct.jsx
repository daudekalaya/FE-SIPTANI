import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import FormEditProduct from "../components/FormEditProduct";

const EditProduct = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasikan pengambilan data pengguna
    const getUserData = async () => {
      try {
        // Ganti ini dengan logika getMe yang sebenarnya
        // Contoh: ambil data pengguna dari API
        // const response = await fetchUserData();
        // if (response.error) {
        //   setIsError(true);
        // }
      } catch (error) {
        setIsError(true);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <FormEditProduct />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
