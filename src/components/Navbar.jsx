import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import config from "../config/config";
import { CartContext } from "../pages/keranjang";

const Navbar = ({ cartCounter, cartData, onCartUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const { product, setProduct } = useContext(CartContext);

  const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    saveUserDataToLocalStorage(userData);
    if (userData.user && userData.user.username) {
      setUsername(userData.user.username);
    }
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      setIsLoggedIn(true);
      const parsedUserData = JSON.parse(userDataString);
      if (parsedUserData.user && parsedUserData.user.username) {
        setUsername(parsedUserData.user.username);
      }

      const cartDataString = localStorage.getItem("cartData");
      if (cartDataString) {
        const cartData = JSON.parse(cartDataString);
        onCartUpdate(cartData);
      }
    }

    getCountCart();
  }, []);

  // useEffect(() => {
  //   const cartDataString = localStorage.getItem("cartData");
  //   if (cartDataString) {
  //     const cartData = JSON.parse(cartDataString);
  //     onCartUpdate(cartData);
  //   }
  // }, []);

  const getCountCart = () => {
    const sessionId = localStorage.getItem("cartId");
    if (sessionId) {
      axios
        .get(config.ROOT_URL + "frontend/keranjang?session_id=" + sessionId)
        .then((result) => {
          const cartData = result.data.data;
          onCartUpdate(cartData); // Memperbarui data keranjang pada komponen induk
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cartData");
    setIsLoggedIn(false);
    setUsername("");
    // Perform other logout actions as needed, e.g., redirecting the user to the login page
    window.location.href = "/login";
  };

  const addToCart = (product_item) => {
    const cartId = localStorage.getItem("cartId");
    const existingCartItem = product.find(
      (item) => item.produk.id === product_item.produk.id
    );

    if (existingCartItem) {
      // Produk sudah ada di keranjang, tingkatkan jumlahnya saja
      existingCartItem.qty += 1;
      const updatedProduct = product.map((item) =>
        item.produk.id === product_item.produk.id ? existingCartItem : item
      );
      setProduct(updatedProduct);
    } else {
      // Produk belum ada di keranjang, tambahkan produk baru
      const newItem = {
        produk: product_item.produk,
        qty: 1,
      };
      setProduct([...product, newItem]);
    }

    // Memperbarui data keranjang di Navbar setiap kali ada penambahan produk ke keranjang
    getCountCart();
  };

  const getUniqueProductCount = (cartItems) => {
    const uniqueProductIds = new Set();
    cartItems.forEach((item) => {
      uniqueProductIds.add(item.produk.id);
    });
    return uniqueProductIds.size;
  };

  return (
    <nav className="bg-transparent backdrop-blur-xl p-4 fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <img className="h-10" src={Logo} alt="Logo" />
        </div>

        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="inline-flex space-x-8 font-medium items-center justify-center">
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/produk">Produk</Link>
            </li>
            <li>
              <Link to="/kontak">Kontak</Link>
            </li>
            <li>
              <Link to="/tentang">Tentang</Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/keranjang">
            <FaShoppingCart className="h-6 w-6 hover:text-greenFarm" />
          </Link>
          {getUniqueProductCount(cartData) > 0 && (
            <span>{getUniqueProductCount(cartData)}</span>
          )}

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="hover:text-greenFarm"
                >
                  {username}
                </button>
                {isOpen && (
                  <ul className="absolute right-0 bg-white mt-2 p-2 rounded-lg shadow-lg">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-500 hover:underline"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                Login
              </Link>
              <Link to="/register">
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleNavbar}
            type="button"
            className="focus:outline-none focus:text-gray-200"
          >
            {/* Add hamburger icon */}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden mt-4">
          <ul className="font-medium">
            <li className="my-2">
              <Link to="/">Beranda</Link>
            </li>
            <li className="my-2">
              <Link to="/produk">Produk</Link>
            </li>
            <li className="my-2">
              <Link to="/kontak">Kontak</Link>
            </li>
            <li className="my-2">
              <Link to="/tentang">Tentang</Link>
            </li>
            {/* Tautan untuk login dan register */}
            {!isLoggedIn ? (
              <>
                <li className="my-2">
                  <Link to="/login">Login</Link>
                </li>
                <li className="my-2">
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="my-2">
                <span>{username}</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
