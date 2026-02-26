
import useCart from '../../../hooks/useCart';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    
    // Calculate total price accurately
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    const handleDelete = (id) => {
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
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been removed from the cart.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="w-full bg-[#F6F6F6] min-h-screen ">
            {/* Section Header */}
            <div className="text-center ">
                <p className="text-[#D1A054] italic mb-2">---My Cart---</p>
                <h2 className="text-3xl font-bold uppercase border-y-4 border-gray-400 py-4 inline-block px-10">Wanna Add More?</h2>
            </div>

            {/* Table Container */}
            <div className="bg-white md:mx-10 shadow-lg">
                <div className="flex justify-between items-center mb-6 font-cinzel">
                    <h2 className="text-xl font-bold">Total Items: {cart.length}</h2>
                    <h2 className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</h2>
                    {
                        cart.length ? 
                        <Link to="/dashboard/payment" className="btn btn-ghost bg-[#D1A054] text-white btn-sm">
                            Pay Now
                        </Link>
                        :
                        <button disabled className="btn btn-ghost bg-gray-400 text-white btn-sm cursor-not-allowed">
                            Pay Now
                        </button>

                    }
                </div>

                <div className="overflow-x-auto rounded-t-xl">
                    <table className="table w-full">
                        {/* Table Header with specific Gold color from screenshot */}
                        <thead className="bg-[#D1A054] text-white uppercase h-[60px]">
                            <tr>
                                <th>#</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item._id} className="border-b">
                                    <td className="font-bold">{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className=" font-semibold">{item.name}</td>
                                    <td className="font-bold">${item.price}</td>
                                    <td>
                                        <button className="btn btn-ghost bg-[#D1A054] text-white btn-sm">
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-ghost bg-[#B91C1C] text-white btn-sm"
                                        >
                                            <FaTrashAlt />
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

export default Cart;