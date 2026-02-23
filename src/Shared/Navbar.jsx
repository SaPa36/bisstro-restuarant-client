import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { TiShoppingCart } from "react-icons/ti";
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>
        <li><Link to="/secret">Secret</Link></li>
        {
            user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>
        }
        {
            user && isAdmin && <li><Link to="/dashboard/adminHome">Admin Dashboard</Link></li>
        }
        
        <li>
            <Link to="/dashboard/cart">
                

                <button className="btn btn-ghost">
                    <TiShoppingCart /> <div className="badge badge-sm badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>
    </>;
    return (
        <>
            <div className="navbar fixed z-10  lg:max-w-screen-xl bg-black/30 text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {menuItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <span className="mr-4">Welcome {user.displayName}</span>
                            <button onClick={handleLogOut} className="btn btn-outline btn-warning">Logout</button>
                        </>
                    ) : (
                        <div className="navbar-end gap-4">
                            <Link to="/login">
                                <button className="btn btn-outline border-0 border-b-4">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-outline border-0 border-b-4">Register</button>
                            </Link>
                        </div>
                    )}
                </div>

            </div>

        </>
    );
};

export default Navbar;