import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUtensils, FaList, FaBook, FaUsers, FaShoppingBag, FaEnvelope, FaShoppingCart, FaCalendarAlt, FaWallet, FaBars } from "react-icons/fa";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const navOptions = (
        <>
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
                    <li><NavLink to="/dashboard/reservation"><FaCalendarAlt /> Reservation</NavLink></li>
                    <li><NavLink to="/dashboard/paymentHistory"><FaWallet /> Payment History</NavLink></li>
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
        </>
    );

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col bg-gray-100">
                {/* Mobile Navbar with Icon */}
                <div className="w-full flex items-center justify-between lg:hidden bg-[#D1A054] p-4 text-black">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button">
                        <FaBars className="text-xl" />
                    </label>
                    <h1 className="text-xl font-bold uppercase font-cinzel">Bistro Boss</h1>
                </div>

                {/* Main Content Area */}
                <div className="p-5 lg:p-10">
                    <Outlet></Outlet>
                </div>
            </div>

            {/* Sidebar / Drawer Side */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="w-64 min-h-screen bg-[#D1A054] text-black p-4 uppercase font-cinzel">
                    <div className="mb-10 px-4 hidden lg:block">
                        <h1 className="text-2xl font-black leading-tight">Bistro Boss</h1>
                        <p className="tracking-[0.2em] text-sm font-bold">Restaurant</p>
                    </div>

                    <ul className="menu p-0 text-base font-semibold space-y-2">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;