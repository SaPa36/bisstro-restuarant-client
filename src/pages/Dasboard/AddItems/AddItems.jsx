import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);
    // imag upload to imgbb and then get an url and then send to the server with other data
    const imageFile = {image: data.image[0]};
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },

    });

    if(res.data.success){
        // If the image upload is successful, we can proceed to send the item data to our server
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url, // Use the URL from the image hosting response
        };
        const menuRes = await axiosSecure.post('/menu', menuItem);
        console.log("Menu Item Added Response:", menuRes.data);
        if(menuRes.data.insertedId){
          reset(); // Reset the form after successful submission
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your item has been added',
            showConfirmButton: false,
            timer: 1500
          });
        }
    }
    console.log("Image Upload Response:", res.data);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4 px-4 font-sans">
      {/* Header Section */}
      <div className="text-center mb-10">
        <p className="text-[#D4A017] text-sm tracking-[0.3em] font-medium italic">--- What's new? ---</p>
        <h1 className="text-4xl font-normal text-gray-800 px-20 py-4 border-y-4 border-gray-200 uppercase mt-4">
          Add An Item
        </h1>
      </div>

      {/* Form Container - Light Gray Background */}
      <div className="bg-[#F3F3F3] p-8 md:p-14 w-full max-w-5xl rounded-sm shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Recipe Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Recipe name*</label>
            <input
              {...register("name", { required: "Recipe name is required" })}
              placeholder="Recipe name"
              className="w-full p-4 bg-white border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition-all"
            />
            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Category*</label>
              <select
               defaultValue="default                                                ````````````"
                {...register("category", { required: "Category is required" })}
                className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] text-gray-500"
              >
                <option disabled value="default">Select Category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soups</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            
            {/* Price */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Price*</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                placeholder="Price"
                className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
              />
            </div>
          </div>

          {/* Recipe Details */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Recipe Details*</label>
            <textarea
              {...register("recipe", { required: "Details are required" })}
              placeholder="Recipe Details"
              rows="6"
              className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] resize-none"
            />
          </div>

          {/* File Input */}
          <div className="py-2">
            <input
              type="file"
              {...register("image")}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-none file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-200 file:text-gray-700
                hover:file:bg-gray-300 cursor-pointer"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#8B6528] hover:bg-[#705220] text-white px-8 py-3 flex items-center gap-2 font-bold uppercase transition-colors"
          >
            Add Item 
            <span role="img" aria-label="utensils" className="text-lg">🍴</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;