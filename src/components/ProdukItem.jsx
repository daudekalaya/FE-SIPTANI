import { Link } from "react-router-dom";

const ProdukItem = (props) => {
  return (
    <div className="card h-96 w-full bg-base-100 shadow-xl mb-5">
      <figure>
        <img
          src={props.image}
          alt={props.title}
          className="w-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl md:text-2xl font-bold mb-2]">
          {props.title}
        </h2>
        <h4 className="text-lg md:text-xl font-medium">{props.price}</h4>
        <div className="card-actions justify-end">
          <Link to={`/produkDetail/${props.action}`}>
            <button className="bg-greenFarm hover:bg-greenFarmHover text-white btn-buy py-2 px-4 rounded">
              Beli
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProdukItem;
