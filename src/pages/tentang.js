import React, { Component } from 'react';
import ImageAbout from '../assets/peasant tools.png';

class Tentang extends Component {
  render() {
    return (
      <div className="container mx-auto mb-8 px-4 pt-36 md:px-20 lg:px-40"> {/* Add mt-8 for top margin */}
        <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={ImageAbout}
              alt="Farm Image"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Lorem ipsum dolor sit amet</h2>
            <p className="text-lg mb-4 text-justify">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
              In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <p className="text-lg mb-4 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis, risus non fermentum venenatis,
              metus nisi egestas nibh, quis egestas tellus tortor sit amet libero. Nunc consectetur ullamcorper justo,
              a fermentum turpis bibendum non.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Tentang;
