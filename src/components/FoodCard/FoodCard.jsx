import React, { use, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FoodCard = ({ item }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { image, name, recipe, price } = item;
  const handleAddToCart = (food) => {
    if (user && user.email) {
      // Add to cart logic here
      console.log("Adding to cart:", food);
    }
    else {
      Swal.fire({
        title: "You are not logged in!",
        text: "Please log in to add items to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }

      });
    }
  };
  return (
    <div className="card bg-[#F3F3F3] shadow-xl rounded-none">
      <figure>
        <img
          src={image}
          alt="Caeser Salad"
          className="w-full h-[280px] object-cover" // Shorter image height
        />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 bg-slate-900 px-4 text-white">{price}</p>
      <div className="card-body items-center text-center p-6">
        {" "}
        {/* Reduced padding */}
        <h2 className="card-title text-xl font-bold">{name}</h2>
        <p className="text-sm text-[#151515]">
          {recipe}
        </p>
        <div className="card-actions mt-4">
          <button onClick={() => handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 border-[#BB8506] bg-[#E8E8E8] text-[#BB8506] uppercase hover:bg-[#111827] hover:border-[#BB8506]">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

};

export default FoodCard;
