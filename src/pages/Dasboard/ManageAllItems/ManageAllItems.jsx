import React from 'react';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Ensure react-icons is installed

const ManageAllItems = () => {
    const [menu] = useMenu();

    

    const handleEditItem = (item) => {
        console.log("Edit item:", item);
        // Add your navigation logic to edit page here
    };

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Using plural /users/ to match the GET request
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Now refetch is in scope
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been removed.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => console.log(error));
            }
        });

    };

    return (
        <div className="w-full bg-white min-h-screen p-10">
            {/* Section Header */}
            <div className="text-center mb-10">
                <p className="text-[#D4A017] text-sm tracking-[0.3em] font-medium italic">---Hurry Up!---</p>
                <h1 className="text-4xl font-normal text-gray-800 px-10 py-4 border-y-4 border-gray-200 uppercase mt-4 inline-block">
                    Manage All Items
                </h1>
            </div>

            {/* Table Container */}
            <div className="max-w-6xl mx-auto bg-white p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold uppercase">Total Items: {menu.length}</h2>
                </div>

                <div className="overflow-x-auto rounded-t-xl">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-[#D1A054] text-white">
                            <tr>
                                <th className="p-5 text-left rounded-tl-xl">#</th>
                                <th className="p-5 text-left">ITEM IMAGE</th>
                                <th className="p-5 text-left">ITEM NAME</th>
                                <th className="p-5 text-left">PRICE</th>
                                <th className="p-5 text-center">ACTION</th>
                                <th className="p-5 text-center rounded-tr-xl">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item, index) => (
                                <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="p-5 font-bold">{index + 1}</td>
                                    <td className="p-5">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt={item.name} className="object-cover" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-gray-600 font-medium">{item.name}</td>
                                    <td className="p-5 text-gray-600">${item.price}</td>
                                    <td className="p-5 text-center">
                                        <button
                                            onClick={() => handleEditItem(item)}
                                            className="bg-[#D1A054] text-white p-3 rounded-md hover:bg-[#b38843] transition-all"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                    </td>
                                    <td className="p-5 text-center">
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="bg-[#B91C1C] text-white p-3 rounded-md hover:bg-red-800 transition-all"
                                        >
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAllItems;