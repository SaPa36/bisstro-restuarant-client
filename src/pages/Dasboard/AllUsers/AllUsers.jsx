import { FaTrashAlt, FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    // 1. Properly destructure refetch and data
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch(); // Refetch to get the updated user list
                    Swal.fire({
                        title: "Success!",
                        text: `${user.name} is now an admin.`,
                        icon: "success"
                    });
                }
            })
            .catch(error => console.log(error));
    }


    const handleDelete = (user) => {
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Now refetch is in scope
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been removed.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => console.log(error));
            }
        });
    }

    // 3. One single return for the JSX
    return (
        <div className="w-full bg-[#F6F6F6] min-h-screen md:p-10">
            <div className="text-center mb-8">
                <p className="text-[#D1A054] italic mb-2">---How Many?---</p>
                <h2 className="text-3xl font-bold uppercase border-y-4 border-gray-400 py-4 inline-block px-10">Manage All Users</h2>
            </div>

            <div className="bg-white md:mx-10 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold font-cinzel">Total Users: {users.length}</h2>
                </div>

                <div className="overflow-x-auto rounded-t-xl">
                    <table className="table w-full">
                        <thead className="bg-[#D1A054] text-white uppercase h-[60px]">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b">
                                    <td className="font-bold">{index + 1}</td>
                                    <td className="font-semibold text-gray-600">{user.name}</td>
                                    <td className="text-gray-600">{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <span className="text-green-500 font-bold">Admin</span>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-ghost bg-[#D1A054] text-white btn-sm">
                                                <FaUser />
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user)}
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

export default AllUsers;