import React, { useEffect, useState, useContext } from "react";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import config from "../config/config";
import axios from "axios";
import formatRupiah from "../libs/formatRupiah";

export const CartContext = React.createContext();

const Keranjang = ({ setCounter }) => {
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [product_item, setProductItem] = useState({});
  // const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
    retrieveCartFromLocalStorage();
    getCart();
  }, []);

  useEffect(() => {
    storeCartToLocalStorage(); // Simpan data keranjang ke localStorage setiap kali ada perubahan pada state product
  }, [product]);

  useEffect(() => {
    saveCartToLocalStorage(product);
  }, [product]);

  useEffect(() => {
    // Hitung total item di keranjang dan update cartCounter
    const totalItems = getTotalCartItem(product);
    setCounter(totalItems);
  }, [product]);

  const checkLoginStatus = () => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setIsLoggedIn(true);
    }
  };

  const getCart = () => {
    const sessionId = localStorage.getItem("cartId");
    axios
      .get(config.ROOT_URL + "frontend/keranjang?session_id=" + sessionId)
      .then((result) => {
        const cartData = result.data.data;
        setProduct(cartData);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  const addToCart = (product_item, quantity) => {
    const cartId = localStorage.getItem("cartId");
    const existingCartItemIndex = product.findIndex(
      (item) => item.produk.id === product_item.produk.id
    );

    if (existingCartItemIndex !== -1) {
      // Produk sudah ada di keranjang, tambahkan qty nya saja
      const updatedProduct = [...product];
      updatedProduct[existingCartItemIndex].qty += quantity;
      setProduct(updatedProduct); // Update state product
    } else {
      // Produk belum ada di keranjang, tambahkan produk baru
      const newItem = {
        produk: product_item.produk,
        qty: quantity,
      };
      setProduct([...product, newItem]);
    }
  };

  const getTotalCartItem = (cartItems) => {
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += item.qty;
    });
    return totalItems;
  };

  // Fungsi untuk menghitung jumlah unik item produk dalam keranjang
  const getUniqueProductCount = (cartItems) => {
    const uniqueProductIds = new Set();
    cartItems.forEach((item) => {
      uniqueProductIds.add(item.produk.id);
    });
    return uniqueProductIds.size;
  };

  const deleteCart = (id) => {
    axios
      .delete(config.ROOT_URL + "frontend/keranjang/" + id)
      .then((result) => {
        alert(result.data.message);
        // Ambil ulang data keranjang setelah menghapus item
        getCart();
        // Hapus item dari state setelah berhasil dihapus dari server
        setProduct((prevProduct) =>
          prevProduct.filter((item) => item.id !== id)
        );
        // Update cartCounter dengan total produk yang tersisa di keranjang
        setCounter((prevCounter) => prevCounter - 1);
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  };

  const increaseQty = (index) => {
    // Tambahkan qty pada item dengan indeks tertentu
    const updatedProduct = [...product];
    updatedProduct[index].qty += 1;
    setProduct(updatedProduct);
  };

  const decreaseQty = (index) => {
    // Kurangi qty pada item dengan indeks tertentu
    const updatedProduct = [...product];
    if (updatedProduct[index].qty > 1) {
      updatedProduct[index].qty -= 1;
      setProduct(updatedProduct);
    }
  };

  const retrieveCartFromLocalStorage = () => {
    const cartDataString = localStorage.getItem("cartData");
    if (cartDataString) {
      const cartData = JSON.parse(cartDataString);
      setProduct(cartData);
    }
  };

  const storeCartToLocalStorage = () => {
    const cartDataString = JSON.stringify(product);
    localStorage.setItem("cartData", cartDataString);
  };

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  };

  let totalProduk = 0;

  const resetCart = () => {
    setProduct([]);
    localStorage.removeItem("cartData");
  };
  return (
    <CartContext.Provider value={{ product, setProduct, resetCart }}>
      <React.Fragment>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-20 lg:px-40 pt-16">
          <div className="p-4 md:p-8 lg:p-16 bg-gray-100 rounded-lg w-full">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-greenFarm text-white">
                  <th className="py-2">#</th>
                  <th className="py-2">Produk</th>
                  <th className="py-2">Harga</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Jumlah</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {product.map((item, index) => {
                  const formattedPrice = parseFloat(
                    formatRupiah(item.produk.price).replace(/[^\d]/g, "")
                  );
                  const jumlah = formattedPrice * parseFloat(item.qty);
                  totalProduk += jumlah;

                  return (
                    <tr className="border-t" key={index}>
                      <td className="py-4">{index + 1}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={
                              config.ROOT_URL + "public/" + item.produk.image
                            }
                            alt="Produk"
                            className="w-16 h-16 rounded-lg mr-4"
                          />
                          <h4 className="text-lg font-medium">
                            {item.produk.title}
                          </h4>
                        </div>
                      </td>
                      <td className="py-4">
                        {formatRupiah(parseFloat(item.produk.price))}
                      </td>
                      <td className="py-4">
                        <button
                          className="bg-greenFarm text-white px-2 py-1 rounded"
                          onClick={() => decreaseQty(index)}
                        >
                          -
                        </button>
                        <span className="px-3">{parseFloat(item.qty)}</span>
                        <button
                          className="bg-greenFarm text-white px-2 py-1 rounded"
                          onClick={() => increaseQty(index)}
                        >
                          +
                        </button>
                      </td>
                      <td className="py-4">{formatRupiah(jumlah)}</td>
                      <td className="py-4">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-full"
                          onClick={() => deleteCart(item.id)}
                        >
                          <FiX />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-8 flex justify-end">
              <table className="w-full md:w-auto text-right">
                <tbody>
                  <tr className="border-t">
                    <td className="py-4 font-bold">TOTAL</td>
                    <td className="text-right py-4">
                      {formatRupiah(totalProduk)}
                    </td>
                  </tr>
                  <tr className="md:hidden">
                    <td colSpan="2" className="py-4">
                      {isLoggedIn ? (
                        <Link to="/checkout">
                          <button className="bg-greenFarm hover:bg-greenFarm-dark text-white px-4 py-2 rounded-lg shadow-md w-full">
                            Bayar Sekarang
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="bg-greenFarm hover:bg-greenFarm-dark text-white px-4 py-2 rounded-lg shadow-md w-full"
                          onClick={() => navigate("/login")} // Gunakan useNavigate untuk melakukan navigasi ke halaman login
                        >
                          Login untuk Membeli
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Tombol "Bayar Sekarang" ditampilkan di bawah tabel untuk perangkat seluler */}

            <div className="hidden md:flex justify-end mt-8">
              {isLoggedIn ? (
                <Link to="/checkout">
                  <button className="bg-greenFarm hover:bg-greenFarm-dark text-white px-4 py-2 rounded-lg shadow-md">
                    Bayar Sekarang
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-greenFarm hover:bg-greenFarm-dark text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => navigate("/login")} // Gunakan useNavigate untuk melakukan navigasi ke halaman login
                >
                  Login untuk Membeli
                </button>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    </CartContext.Provider>
  );
};

export default Keranjang;
