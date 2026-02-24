import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Don't forget this import
import { FaWallet, FaUsers, FaUtensils, FaTruck, FaArrowUp, FaMinus, FaCheck } from "react-icons/fa";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', 'black'];

// Custom Shape Function for the Triangles
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};


const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-bars loading-lg text-primary"></span>
        </div>;
    }

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });



    return (
        <div className="p-4 bg-slate-50 min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-between p-4
             bg-white rounded-3xl shadow-sm border border-gray-100 mb-4">
                <div className="flex items-center gap-6">
                    {/* User Avatar with Ring Effect */}
                    <div className="relative">
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/150'}
                            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-orange-100 shadow-lg"
                            alt="Profile"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">{user?.displayName || 'Admin'}</span>!
                        </h1>
                        <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                            <i className="fa-regular fa-calendar-check text-orange-400"></i>
                            {today}
                        </p>
                    </div>
                </div>

                <div className="hidden lg:block text-right">
                    <button className="btn btn-ghost bg-orange-50 text-orange-600 hover:bg-orange-100 border-none px-6 rounded-xl capitalize font-bold">
                        System Status: Online
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Revenue Card */}
                <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200">
                            <FaWallet className="text-2xl text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Revenue</p>
                            <h3 className="text-3xl font-bold text-slate-800">${stats?.revenue?.toFixed(2) || '0.00'}</h3>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-semibold text-emerald-500">
                        <FaArrowUp className="mr-1" /> +12.5%
                        <span className="ml-2 text-slate-400 font-normal">from last month</span>
                    </div>
                </div>

                {/* Customers Card */}
                <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-amber-200">
                            <FaUsers className="text-2xl text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Customers</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stats?.users || 0}</h3>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-semibold text-emerald-500">
                        <FaArrowUp className="mr-1" /> +5.2%
                        <span className="ml-2 text-slate-400 font-normal">new users</span>
                    </div>
                </div>

                {/* Products Card */}
                <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-rose-100 hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl shadow-lg shadow-rose-200">
                            <FaUtensils className="text-2xl text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Products</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stats?.products || 0}</h3>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-semibold text-rose-500">
                        <FaMinus className="mr-1" /> -2%
                        <span className="ml-2 text-slate-400 font-normal">out of stock</span>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="relative overflow-hidden group bg-white p-6 rounded-3xl shadow-xl border border-sky-100 hover:shadow-2xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-bl-full transform group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg shadow-sky-200">
                            <FaTruck className="text-2xl text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Orders</p>
                            <h3 className="text-3xl font-bold text-slate-800">{stats?.orders || 0}</h3>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs font-semibold text-emerald-500">
                        <FaCheck className="mr-1" /> 98%
                        <span className="ml-2 text-slate-400 font-normal">fulfillment rate</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
                {chartData.map((data, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-bold text-orange-600 uppercase text-sm">{data.category}</h4>
                        <p className="text-slate-600">Quantity: <span className="font-semibold">{data.quantity}</span></p>
                        <p className="text-slate-600">Revenue: <span className="font-semibold">${data.revenue.toFixed(2)}</span></p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row mt-12 gap-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                {/* Bar Chart Section */}
                <div className="w-full md:w-1/2" style={{ height: 400 }}>
                    <h2 className="text-xl font-bold mb-6 text-gray-700">Orders by Category</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="quantity"
                                fill="#8884d8"
                                shape={<TriangleBar />}
                                label={{ position: 'top' }}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 7]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend or Stats Section */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-bold mb-6 text-gray-700">Category Details</h2>
                    <div className="space-y-4">
                        {chartData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[idx % 7] }}></div>
                                    <span className="font-semibold text-gray-600 capitalize">{item.category}</span>
                                </div>
                                <span className="text-gray-500">{item.quantity} orders</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;