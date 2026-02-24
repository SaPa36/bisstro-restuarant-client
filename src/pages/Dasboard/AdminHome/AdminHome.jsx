import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Don't forget this import
import { FaWallet, FaUsers, FaUtensils, FaTruck, FaArrowUp, FaMinus, FaCheck } from "react-icons/fa";

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Legend
} from 'recharts';

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

// --- Pie Chart Custom Label ---
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
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

    // Transform chartData for Pie Chart: mapping 'category' to 'name' and 'quantity' to 'value'
    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.quantity };
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

            
            {/* Combined Charts Section */}
            <div className="flex flex-col lg:flex-row mt-12 gap-8">
                
                {/* 1. Bar Chart */}
                <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-gray-700">Orders by Category</h2>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
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
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 2. Pie Chart */}
                <div className="w-full lg:w-1/2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 text-gray-700">Category Percentage</h2>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;