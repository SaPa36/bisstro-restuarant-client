import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-white font-inter">
            <div className="flex flex-col md:flex-row w-full">
                {/* Contact Us Section */}
                <div className="bg-[#1F2937] flex-1 p-10 flex flex-col items-center justify-center text-center">
                    <h3 className="text-3xl font-medium mb-6 uppercase">Contact Us</h3>
                    <div className="space-y-2">
                        <p>123 ABS Street, Uni 21, Bangladesh</p>
                        <p>+88 123456789</p>
                        <p>Mon - Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>

                {/* Follow Us Section */}
                <div className="bg-[#111827] flex-1 p-10 flex flex-col items-center justify-center text-center">
                    <h3 className="text-3xl font-medium mb-6 uppercase">Follow US</h3>
                    <p className="mb-6">Join us on social media</p>
                    <div className="flex gap-6 text-2xl">
                        <a href="#" className="hover:text-[#D1A054] transition-colors">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-[#D1A054] transition-colors">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-[#D1A054] transition-colors">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-[#151515] py-4 text-center">
                <p className="text-sm">Copyright © Bistro Boss Restaurant. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;