import React, { useContext } from 'react';
import loginImg from '../../assets/others/authentication2.png'; // Make sure this path is correct
import bgImg from '../../assets/others/authentication.png'; // The textured background
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Social from '../../components/Social/Social';



const Register = () => {
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }

                        axiosPublic.post("/users", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("User addeded to database");
                                    
                                    reset();
                                    Swal.fire({
                                        title: "User Registered Successfully!",
                                        icon: "success",
                                        draggable: true
                                    });
                                    navigate("/login");
                                    logOut();
                                }
                                })
                            .catch(err => {
                                console.error("Error posting user info:", err);
                            });
                        

                    })

                    .catch(error => {
                        console.log(error);
                    })


            })

    };





    return (

        <div>
            <Helmet>
                <title>Bistro Boss | Register</title>
            </Helmet>

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
                                    <span className="label-text font-semibold">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    placeholder="Your Photo URL"
                                    className="input input-bordered focus:outline-none rounded-lg"
                                    required
                                    {...register("photoURL", { required: true })}
                                />
                                {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
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
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                />
                                {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
                                {errors.password?.type === "minLength" && <span className="text-red-500">Password must be at least 6 characters</span>}
                                {errors.password?.type === "maxLength" && <span className="text-red-500">Password must be less than 20 characters</span>}
                                {errors.password?.type === "pattern" && <span className="text-red-500">Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character</span>}
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
                            <Social></Social>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;