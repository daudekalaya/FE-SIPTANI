import React, { Component } from 'react';

class Kontak extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="flex justify-center mt-20">
          <form className="w-full py-10 px-6 md:px-20 lg:px-64 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Form Kontak</h2>
            <div className="mb-4">
              <label className="text-gray-700">Nama Lengkap</label>
              <input type="text" className="form-input mt-1 w-full border border-slate-800 px-4 py-2 rounded-md" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-gray-700">Email</label>
              <input type="email" className="form-input mt-1 w-full border border-slate-800 px-4 py-2 rounded-md" placeholder="john.doe@example.com" />
            </div>
            <div className="mb-4">
              <label className="text-gray-700">Pesan</label>
              <textarea className="form-textarea mt-1 w-full border border-slate-800 px-4 py-2 rounded-md" rows="4" placeholder="Pesan Anda di sini..."></textarea>
            </div>
            <button className="btn bg-greenFarm text-white hover:bg-greenFarmHover rounded-md">Kirim</button>
          </form>
        </div>
        <div className="text-center mt-16">
          <h4 className="text-xl font-bold">Kontak Kami</h4>
          <p>Telp: 123456789</p>
          <p>Alamat Kami: Jl Sirotol Mustaqim</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Kontak;
