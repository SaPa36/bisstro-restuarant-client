import React, { use, useContext, useEffect, useRef, useState } from 'react';
import loginImg from '../../assets/others/authentication2.png'; // Make sure this path is correct
import bgImg from '../../assets/others/authentication.png'; // The textured background
import { Link } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';



const Register = () => {
    const { createUser } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    };



    return (
        <div
            className="hero min-h-screen"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="hero-content flex-col lg:flex-row-reverse shadow-2xl p-10 bg-transparent border border-gray-200">

                {/* Left Side: Image */}
                <div className="text-center lg:text-left md:w-1/2">
                    <img src={loginImg} alt="Login Illustration" />
                </div>

                {/* Right Side: Form */}
                <div className="card shrink-0 w-full max-w-sm md:w-1/2 bg-transparent">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-4">Register</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered focus:outline-none rounded-lg"
                                required
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered focus:outline-none rounded-lg"
                                required
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered focus:outline-none rounded-lg"
                                required
                                {...register("password", { required: true, minLength: 6 , maxLength: 20 })}
                            />
                            {errors.password && <span className="text-red-500">Password must be 6 characters long</span>}
                        </div>



                        <div className="form-control mt-6">
                            <input
                                className="btn w-full mr-20 bg-[#D1A054B2] hover:bg-[#D1A054] text-white border-none rounded-lg"
                                type="submit"
                                value="Sign In"

                            />
                        </div>
                    </form>

                    <div className="text-center pb-6">
                        <p className="text-[#D1A054]">
                            <small>Already have an account? <Link className="font-bold" to="/login">Log In</Link></small>
                        </p>
                        <p className="mt-2">Or sign in with</p>
                        <div className="flex justify-center gap-4 mt-4 text-2xl">
                            {/* You can replace these with React Icons like FaGoogle, FaFacebook */}
                            <button className="btn btn-circle btn-outline btn-sm">f</button>
                            <button className="btn btn-circle btn-outline btn-sm">G</button>
                            <button className="btn btn-circle btn-outline btn-sm">in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;