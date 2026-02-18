
import { FaEdit, FaTrashAlt, FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });
    
    return (
        <div className="w-full bg-[#F6F6F6] min-h-screen ">
                    {/* Section Header */}
                    <div className="text-center ">
                        <p className="text-[#D1A054] italic mb-2">---How Many?---</p>
                        <h2 className="text-3xl font-bold uppercase border-y-4 border-gray-400 py-4 inline-block px-10">Manage All Users</h2>
                    </div>
        
                    {/* Table Container */}
                    <div className="bg-white p-10 shadow-lg">
                        <div className="flex justify-between items-center mb-6 font-cinzel">
                            <h2 className="text-xl font-bold">Total Items: {users.length}</h2>
                            
                        </div>
        
                        <div className="overflow-x-auto rounded-t-xl">
                            <table className="table w-full">
                                {/* Table Header with specific Gold color from screenshot */}
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
                                    
                                            <td className=" font-semibold">{user.name}</td>
                                            <td className="font-bold">{user.email}</td>
                                            <td>
                                                <button 
                                                    
                                                    className="btn btn-ghost bg-[#D1A054] text-white btn-sm"
                                                >
                                                    <FaUser />
                                                </button>
                                            </td>
                                            
                                            <td>
                                                <button 
                                                    onClick={() => handleDelete(user._id)}
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