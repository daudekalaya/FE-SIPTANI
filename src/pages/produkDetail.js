import React, { useState, useEffect, useContext } from 'react';
import config from '../config/config';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import formatRupiah from '../libs/formatRupiah';
import { CartContext } from '../pages/keranjang';

const ProdukDetail = ({ setCounter }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product_item, setProductItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { product, setProduct } = useContext(CartContext);

  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    console.log('Mengambil data untuk URL:', config.ROOT_URL + 'frontend/produkDetail/' + url);
    axios
      .get(config.ROOT_URL + 'frontend/produkDetail/' + url)
      .then((result) => {
        console.log('Data diterima:', result.data);
        const product_item = result.data.data;
        setProductItem(product_item);
      })
      .catch((error) => {
        console.error('Error saat mengambil data:', error);
      });
  }, [url]);

  const checkLoginStatus = () => {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      setIsLoggedIn(true);
    }
  };

  const handlePlus = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = async () => {
    if (!isLoggedIn) {
      alert("Anda harus login terlebih dahulu untuk menambahkan ke keranjang.");
      // Opsional, Anda dapat mengarahkan pengguna ke halaman login menggunakan `navigate('/login')`
      return;
    }

    const cartId = localStorage.getItem("cartId");
    const existingCartItem = product_item.produk && product_item.produk.find((item) => item.id === product_item.id);

    if (existingCartItem) {
      // Produk sudah ada di keranjang, tingkatkan jumlahnya saja
      existingCartItem.qty += quantity;
      // const updatedProduct = product_item.map((item) => (item.produk.id === product_item.id ? existingCartItem : item));
      const updatedProduct = { ...product_item, produk: [...product_item.produk] };
      setProductItem(updatedProduct);
      setProduct([...product]);
    } else {
      // Produk belum ada di keranjang, tambahkan produk baru
      const data = {
        produk_id: product_item.id,
        qty: quantity,
        session_id: cartId,
      };

      console.log("DATA >>>> ", data);
      axios
        .post(config.ROOT_URL + "frontend/keranjang", data)
        .then((result) => {
          console.log(result);
          alert(result.data.message);
          setCounter();
        })
        .catch((error) => {
          console.error("Error saat menambahkan ke keranjang:", error);
        });
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 pt-16">
      <div className="container mx-auto hero-content grid md:grid-cols-2 gap-8 p-4 md:p-8 lg:p-16">
        <div className="md:max-w-md">
          {product_item.image ? (
            <img
              src={config.ROOT_URL + 'public/' + product_item.image}
              alt="Gambar Produk"
              className="w-full rounded-lg shadow-lg"
              style={{ maxWidth: '300px' }}
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
          )}
        </div>

        <div className="md:-ml-28">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{product_item.title}</h2>
          <h4 className="text-lg md:text-xl font-medium mb-4">{formatRupiah(product_item.price)}</h4>
          <hr className="my-4" />
          <p>Kategori: {product_item.kategori && product_item.kategori.name}</p>
          <p className="mt-4">{product_item.description}</p>
          <hr className="my-4" />
          <div className="flex items-center">
            <button
              className="bg-greenFarm text-white font-bold px-3 py-1 rounded-lg w-10"
              onClick={handleMinus}
            >
              -
            </button>
            <input
              type="number"
              className="border border-gray-300 mx-4 px-3 py-1 rounded-lg w-16 text-center"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              className="bg-greenFarm text-white font-bold px-3 py-1 rounded-lg w-10"
              onClick={handlePlus}
            >
              +
            </button>
          </div>

          {product_item && (
            <button
              className="bg-greenFarm text-white font-bold flex items-center mt-4 px-4 py-2 rounded-lg"
              onClick={addToCart}
            >
              <FaCartPlus className="mr-2" /> Tambah ke keranjang
            </button>
          )}
        </div>
      </div>

      <div className="px-4 md:px-10 lg:px-16">
        <div>
          <div className="text-2xl md:text-3xl font-bold mb-2">DESKRIPSI</div>
          <hr />
          <p className="text-lg text-gray-700 text-justify leading-relaxed">
            {product_item.full_description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetail;
