// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import formatRupiah from "../../libs/formatRupiah";
// import config from "../../config/config";

// const AdminDashboard = () => {
//   const [produkList, setProdukList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editProdukId, setEditProdukId] = useState(null);
//   const [formValues, setFormValues] = useState({
//     title: "",
//     description: "",
//     full_description: "",
//     image: null,
//     price: 0,
//     category_id: 0,
//   });

//   useEffect(() => {
//     fetchProdukList();
//   }, []);

//   const fetchProdukList = () => {
//     axios
//       .get(config.ROOT_URL + "frontend/produkPage")
//       .then((result) => {
//         setProdukList(result.data.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       });
//   };

//   const handleDeleteProduk = (id) => {
//     axios
//       .delete(config.ROOT_URL + `produk/${id}`)
//       .then((response) => {
//         console.log(response.data);
//         // Refresh daftar produk setelah berhasil menghapus
//         fetchProdukList();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const handleEditProduk = (produk) => {
//     setIsEditing(true);
//     setEditProdukId(produk.id);
//     setFormValues({
//       title: produk.title,
//       description: produk.description,
//       full_description: produk.full_description,
//       image: produk.image, // Tetap menyimpan gambar yang ada saat ini
//       price: produk.price,
//       category_id: produk.category_id,
//     });
//     console.log("apa isinya >> ", produk);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditProdukId(null);
//     setFormValues({
//       title: "",
//       description: "",
//       full_description: "",
//       image: null,
//       price: 0,
//       category_id: 0,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
    
//     // Untuk input tipe file (gambar), cek apakah pengguna memilih gambar baru atau tidak
//     if (type === 'file') {
//       // Jika pengguna memilih gambar baru, simpan file yang dipilih dalam formData
//       if (e.target.files && e.target.files.length > 0) {
//         setFormValues({ ...formValues, [name]: e.target.files[0] });
//       } else {
//         // Jika pengguna tidak memilih gambar baru, pertahankan gambar yang ada
//         setFormValues({ ...formValues, [name]: null });
//       }
//     } else {
//       // Untuk input selain tipe file, simpan nilai seperti biasa
//       setFormValues({ ...formValues, [name]: value });
//     }
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isEditing) {
//       const { title, description, full_description, price, category_id } = formValues;
    
//       // Membuat objek formData baru
//       const formData = new FormData();
    
//       // Menambahkan data ke dalam formData
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("full_description", full_description);
//       formData.append("price", price);
//       formData.append("category_id", category_id);
    
//       // Cek apakah ada file gambar yang dipilih, jika ada tambahkan ke formData
//       if (formValues.image instanceof File) {
//         formData.append("image", formValues.image);
//       } else {
//         // Jika tidak ada gambar yang diubah, tetap sertakan gambar yang ada saat ini dalam formData
//         formData.append("image", formValues.image);
//       }
    
//       axios
//         .put(config.ROOT_URL + `produk/${editProdukId}`, formData)
//         .then((response) => {
//           console.log(response.data);
//           setIsEditing(false);
//           setEditProdukId(null);
//           setFormValues({
//             title: "",
//             description: "",
//             full_description: "",
//             image: null,
//             price: 0,
//             category_id: 0,
//           });
//           // Refresh daftar produk setelah berhasil mengedit
//           fetchProdukList();
//         })
//         .catch((error) => {
//           // Tangani kesalahan di sini dan tampilkan pesan kesalahan kepada pengguna
//           console.error(error);
//           if (error.response && error.response.data) {
//             console.log("Pesan Kesalahan Server:", error.response.data);
//           }
//         });

//     } else {
//       const { title, description, full_description, image, price, category_id } = formValues;

//       // Membuat objek formData baru
//       const formData = new FormData();

//       // Menambahkan data ke dalam formData
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("full_description", full_description);
//       formData.append("image", image);
//       formData.append("price", price);
//       formData.append("category_id", category_id);

//       axios
//         .post(config.ROOT_URL + "produk", formData)
//         .then((response) => {
//           console.log(response.data);
//           // Refresh daftar produk setelah berhasil menambahkan
//           fetchProdukList();
//         })
//         .catch((error) => {
//           console.error("ERROR DISINI >> ", error);
//         });
//         console.log("form DATA >>> ", formData);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>

//       {/* Form untuk menambah atau mengedit produk */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="border rounded-md p-4">
//           <label htmlFor="title" className="block mb-2 font-bold">
//             Judul Produk
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formValues.title}
//             onChange={handleInputChange}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="border rounded-md p-4">
//           <label htmlFor="description" className="block mb-2 font-bold">
//             Deskripsi Singkat
//           </label>
//           <input
//             type="text"
//             id="description"
//             name="description"
//             value={formValues.description}
//             onChange={handleInputChange}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="border rounded-md p-4 col-span-2">
//           <label htmlFor="full_description" className="block mb-2 font-bold">
//             Deskripsi Lengkap
//           </label>
//           <textarea
//             id="full_description"
//             name="full_description"
//             value={formValues.full_description}
//             onChange={handleInputChange}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="border rounded-md p-4">
//           <label htmlFor="image" className="block mb-2 font-bold">
//             Gambar
//           </label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             onChange={(e) =>
//               setFormValues({ ...formValues, image: e.target.files[0] })
//             }
//             required
//             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="border rounded-md p-4">
//           <label htmlFor="price" className="block mb-2 font-bold">
//             Harga
//           </label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formValues.price}
//             onChange={handleInputChange}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="border rounded-md p-4">
//           <label htmlFor="category_id" className="block mb-2 font-bold">
//             ID Kategori
//           </label>
//           <input
//             type="number"
//             id="category_id"
//             name="category_id"
//             value={formValues.category_id}
//             onChange={handleInputChange}
//             required
//             className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className={`bg-${isEditing ? "green" : "blue"}-500 text-white py-2 px-4 rounded`}
//         >
//           {isEditing ? "Simpan Perubahan" : "Tambah Produk"}
//         </button>
//         {isEditing && (
//           <button
//             type="button"
//             onClick={handleCancelEdit}
//             className="bg-gray-500 text-white py-2 px-4 rounded"
//           >
//             Batal
//           </button>
//         )}
//       </form>

//       <table className="w-full mt-8 border">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 bg-blue-500 text-white text-center">ID</th>
//             <th className="px-4 py-2 bg-blue-500 text-white text-center">Judul Produk</th>
//             <th className="px-4 py-2 bg-blue-500 text-white text-center">Harga</th>
//             <th className="px-4 py-2 bg-blue-500 text-white text-center">Aksi</th>
//           </tr>
//         </thead>
//         <tbody>
//           {produkList.map((produk) => (
//             <tr key={produk.id}>
//               <td className="border px-4 py-2 text-left">{produk.id}</td>
//               <td className="border px-4 py-2 text-left">{produk.title}</td>
//               <td className="border px-4 py-2 text-left">{formatRupiah(produk.price)}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => handleEditProduk(produk)}
//                   className="bg-blue-500 text-white py-2 px-4 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteProduk(produk.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded"
//                 >
//                   Hapus
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminDashboard;
