import { NavLink } from "react-router-dom";
import { FaHome, FaUtensils, FaList, FaBook, FaUsers, FaSearch, FaShoppingBag, FaEnvelope } from "react-icons/fa";

const Dashboard = () => {
    // Optional: Toggle this based on your user's role (Admin vs User)
    const isAdmin = true; 

    return (
        <div className="flex">
            {/* Sidebar / Drawer */}
            <div className="w-64 min-h-screen bg-[#D1A054] text-black p-4 uppercase font-cinzel">
                <div className="mb-10 px-4">
                    <h1 className="text-2xl font-black leading-tight">Bistro Boss</h1>
                    <p className="tracking-[0.2em] text-sm font-bold">Restaurant</p>
                </div>

                <ul className="menu p-0 text-base font-semibold space-y-2">
                    {isAdmin ? (
                        <>
                            <li><NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaBook /> Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allUsers"><FaUsers /> All Users</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
                            {/* Add other user-specific links here */}
                        </>
                    )}

                    {/* Divider */}
                    <div className="divider bg-white h-[1px] my-6 opacity-50"></div>

                    {/* Main Website Links */}
                    <li><NavLink to="/"><FaHome /> Home</NavLink></li>
                    <li><NavLink to="/menu"><FaList /> Menu</NavLink></li>
                    <li><NavLink to="/order/salad"><FaShoppingBag /> Shop</NavLink></li>
                    <li><NavLink to="/contact"><FaEnvelope /> Contact</NavLink></li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-10 bg-gray-100">
                {/* Your Outlet goes here for nested routing */}
            </div>
        </div>
    );
};

export default Dashboard;