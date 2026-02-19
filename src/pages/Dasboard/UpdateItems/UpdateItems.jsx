import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const { name, category, price, recipe, _id, image } = useLoaderData();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log("Form Data Submitted:", data);
        // imag upload to imgbb and then get an url and then send to the server with other data
        const imageFile = { image: data.image[0] }; // Use the new file if provided, otherwise keep the existing image
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },

        });

        if (res.data.success) {
            // If the image upload is successful, we can proceed to send the item data to our server
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url, // Use the URL from the image hosting response
            };
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log("Menu Item Updated Response:", menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                reset({
                    name: '',
                    category: '',
                    price: '',
                    recipe: '',
                    image: ''
                });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data.name} has been updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log("Image Upload Response:", res.data);
    };




    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 font-sans">
            {/* Header Section */}
            <div className="text-center mb-10">
                <p className="text-[#D4A017] text-sm tracking-[0.3em] font-medium italic">--- What's new? ---</p>
                <h1 className="text-4xl font-normal text-gray-800 px-20 py-4 border-y-4 border-gray-200 uppercase mt-4">
                    Update An Item
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
                            defaultValue={name}
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
                                defaultValue={category}
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
                                defaultValue={price}
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
                            defaultValue={recipe}
                            placeholder="Recipe Details"
                            rows="6"
                            className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8860B] resize-none"
                        />
                    </div>

                    {/* File Input */}
                    {/* Image Section */}
                    <div className="py-2">
                        <label className="block font-semibold mb-2">Item Image</label>

                        {/* Display the EXISTING image as a preview */}
                        <div className="mb-4 flex items-center gap-4">
                            <img
                                src={image}
                                alt="Current"
                                className="w-24 h-24 object-cover rounded border-2 border-[#D4A017]"
                            />
                            <span className="text-sm text-gray-500 italic">Current Image</span>
                        </div>

                        <input
                            type="file"
                            {...register("image")}
                            className="block w-full text-sm text-gray-500 file:bg-gray-200 file:border-0 file:py-2 file:px-4 cursor-pointer"
                        />
                        <p className="text-xs text-gray-400 mt-1">Leave blank to keep current image</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#8B6528] hover:bg-[#705220] text-white px-8 py-3 flex items-center gap-2 font-bold uppercase transition-colors"
                    >
                        Update Item
                        <span role="img" aria-label="utensils" className="text-lg">🍴</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItems;