import React, { useState } from "react";
import axios from "axios";
import config from "../config/config";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login Data:", formData);

    // Kirim data login ke server
    axios
      .post(config.ROOT_URL + "auth/login", formData) // Sesuaikan dengan URL endpoint login Anda
      .then((response) => {
        // Simpan data pengguna yang login di localStorage atau state aplikasi
        const { user, accessToken } = response.data;
        const userData = { user, accessToken };
        localStorage.setItem("user", JSON.stringify(userData));
        // Redirect ke halaman tertentu setelah berhasil login
        // Misalnya, redirect ke halaman checkout jika pengguna sebelumnya mencoba mengakses checkout tanpa login
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.response) {
          // Jika server mengirimkan respon dengan status error, ambil pesan kesalahan dari respon tersebut
          setErrorMessage(error.response.data.message);
        } else {
          // Jika terjadi kesalahan yang tidak terduga, tampilkan pesan umum
          setErrorMessage("Login failed. Please try again later.");
        }
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold">
            Log in to your account
          </h2>
        </div>
        <div className="card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-greenFarm focus:border-greeFring-greenFarm focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-greenFarm focus:border-greeFring-greenFarm focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-greenFarm hover:bg-greenFarmHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-greenFarm"
                >
                  Log in
                </button>
              </div>
            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
