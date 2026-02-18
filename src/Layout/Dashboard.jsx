import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUtensils, FaList, FaBook, FaUsers, FaSearch, FaShoppingBag, FaEnvelope, FaShoppingCart, FaCalendarAlt, FaWallet } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    // Optional: Toggle this based on your user's role (Admin vs User)
    const [cart, refetch] = useCart();
    
    const [isAdmin] = useAdmin(); 

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
                            <li><NavLink to="/dashboard/mangecart"><FaList /> Manage Cart</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaBook /> Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allUsers"><FaUsers /> All Users</NavLink></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink></li>
                            <li><NavLink to="/dashboard/reservation"><FaCalendarAlt /> Reservation</NavLink></li>
                            <li><NavLink to="/dashboard/payment"><FaWallet /> Payment History</NavLink></li>
                            <li>
                                <NavLink to="/dashboard/cart">
                                    <FaShoppingCart /> My Cart 
                                    <span className="badge badge-secondary ml-2">+{cart?.length || 0}</span>
                                </NavLink>
                            </li>
                            <li><NavLink to="/dashboard/review"><FaBook /> Add Review</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaCalendarAlt /> My Booking</NavLink></li>
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
            <div className="flex-1 px-10 py-5 bg-gray-100">
                {/* Your Outlet goes here for nested routing */}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;