import React, { useState, useEffect } from "react";
import farmImage from "../assets/farmImage.png";
import cabaiRawit from "../assets/francesco-gallarotti-ruQHpukrN7c-unsplash 1.png";
import logo from "../assets/logo.png";
import farmImage4 from "../assets/farmImage4.png";
import ProdukItem from "../components/ProdukItem";
import LayananItem from "../components/LayananItem";
import { FaTruck, FaSeedling, FaUsers } from "react-icons/fa";
import axios from "axios";
import config from "../config/config";
import formatRupiah from "../libs/formatRupiah";

const Homepage = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(config.ROOT_URL + "frontend/produkHome")
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
      <div className="hero min-h-screen bg-base-200 mb-8 px-4 md:px-20 lg:px-40 pt-16">
        <div className="container mx-auto hero-content flex-col md:flex-row-reverse md:my-8">
          <img
            src={farmImage}
            className="rounded-lg shadow-2xl mx-auto md:mx-0"
            alt="Farm"
          />
          <div className="text-center md:text-left md:ml-10">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-relaxed">
              Kami Membantu Anda Meningkatkan Hasil Pertanian Anda
            </h1>
            <p className="py-4 md:py-6">
              Selamat datang di era pertanian digital, di mana teknologi
              memainkan peran penting dalam mengubah wajah industri pertanian.
              Sistem Informasi Hasil Pertanian (SIPTANI) hadir sebagai solusi
              terdepan yang memadukan teknologi modern dengan kebutuhan
              pertanian yang berkelanjutan.
            </p>
            <button className="btn bg-greenFarm text-white hover:bg-greenFarmHover">
              Mulai
            </button>
          </div>
        </div>
      </div>

      {/* Produk Unggulan */}
      <h2 className="text-3xl md:text-4xl lg:text-3xl font-bold text-center mt-20 px-4">
        Produk Unggulan
      </h2>

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

      {/* Banner */}
      <div className="bg-greenFarm text-white p-4 mt-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center">
          <div className="hero-content flex-col lg:flex-row items-center">
            <figure className="max-w-sm">
              <img src={farmImage4} alt="Revolusi Hijau" />
              <figcaption className="text-sm -mt-14 mb-16 text-center">
                <a href="https://www.freepik.com/free-vector/application-smartphone-mobile-computer-payments-online-transaction_33904714.htm#query=farm%20ecommerce%20png&position=2&from_view=search&track=ais">
                  Image by johnstocker
                </a>{" "}
                on Freepik
              </figcaption>
            </figure>
            <div className="lg:pl-8">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold">
                Temukan Revolusi Hijau
              </h2>
              <p className="mt-2">
                Platform digital untuk memperkenalkan produk pertanian unggulan
                dari Kecamatan Sukamantri.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Layanan */}
      <div className="container mx-auto mt-20">
        <div className="flex flex-wrap -m-4">
          {/* Layanan 1 */}
          <LayananItem
            icon={<i className="fas fa-seedling text-2xl"><FaSeedling /></i>}
            title="Pesan Produk Pertanian"
            description="Pesan berbagai produk pertanian seperti buah, sayuran, rempah-rempah, dan lebih banyak lagi secara online."
          />

          {/* Layanan 2 */}
          <LayananItem
            icon={<i className="text-2xl"><FaTruck /></i>}
            title="Pengiriman Cepat"
            description="Kami menyediakan pengiriman cepat dan terpercaya untuk memastikan produk Anda sampai dengan aman dan tepat waktu."
          />

          {/* Layanan 3 */}
          <LayananItem
            icon={<i className="fas fa-users text-2xl"><FaUsers /></i>}
            title="Keranjang Belanja"
            description="Nikmati kemudahan berbelanja dengan keranjang belanja online untuk memilih produk yang Anda inginkan."
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
