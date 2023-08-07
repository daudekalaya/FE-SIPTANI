import React, { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Transaksi = () => {
  const { number } = useParams();
  const [trsNumber, setTrsNumber] = useState("");

  useEffect(() => {
    setTrsNumber(number);
  }, [number]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-20 lg:px-40 pt-16">
      <div className="container mx-auto p-4 md:p-8 lg:p-16 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <FaCheckSquare className="text-greenFarm text-6xl" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Pembayaran Sukses</h2>
          <p className="text-gray-500 mt-2">Dengan No Transaksi: {trsNumber}</p>
          <Link to="/">
            <button className="bg-greenFarm hover:bg-greenFarmHover text-white px-4 py-2 rounded-lg mt-4">
              Kembali Ke Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
