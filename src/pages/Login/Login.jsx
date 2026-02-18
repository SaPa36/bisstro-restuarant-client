import React, { use, useContext, useEffect, useState } from 'react';
import loginImg from '../../assets/others/authentication2.png'; // Make sure this path is correct
import bgImg from '../../assets/others/authentication.png'; // The textured background
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import Social from '../../components/Social/Social';

const Login = () => {
    
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // Add your authentication logic here
        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Failed to log in",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleCaptchaValidation = (e) => {
        const userCaptcha = e.target.value;
        const isCaptchaValid = validateCaptcha(userCaptcha);
        if (isCaptchaValid) {
            setDisabled(false);
        } else {
            alert("Invalid Captcha!");
        }
    };

    return (

        <div>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <div
                className="hero min-h-screen"
                style={{ backgroundImage: `url(${bgImg})` }}
            >
                <div className="hero-content flex-col lg:flex-row shadow-2xl p-10 bg-transparent border border-gray-200">

                    {/* Left Side: Image */}
                    <div className="text-center lg:text-left md:w-1/2">
                        <img src={loginImg} alt="Login Illustration" />
                    </div>

                    {/* Right Side: Form */}
                    <div className="card shrink-0 w-full max-w-sm md:w-1/2 bg-transparent">
                        <form onSubmit={handleLogin} className="card-body">
                            <h1 className="text-4xl font-bold text-center mb-4">Login</h1>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Type here"
                                    className="input input-bordered focus:outline-none rounded-lg"
                                    required
                                />
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
                                />
                            </div>

                            {/* Optional Captcha Placeholder - common in this project template */}
                            <div className="form-control mt-4">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>


                                <input
                                    type="text"
                                    onBlur={handleCaptchaValidation}
                                    name="captcha"
                                    placeholder="Type the captcha above"
                                    className="input input-bordered focus:outline-none rounded-lg"
                                />
                            </div>

                            <div className="form-control mt-6">
                                <input
                                    className="btn w-full mr-20 bg-[#D1A054B2] hover:bg-[#D1A054] text-white border-none rounded-lg"
                                    type="submit"
                                    value="Sign In"
                                    // disable letter
                                    disabled={false}
                                />
                            </div>
                        </form>

                        <div className="text-center pb-6">
                            <p className="text-[#D1A054]">
                                <small>New here? <Link className="font-bold" to="/register">Create a New Account</Link></small>
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

export default Login;