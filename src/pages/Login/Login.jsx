import React, { use, useEffect, useRef, useState } from 'react';
import loginImg from '../../assets/others/authentication2.png'; // Make sure this path is correct
import bgImg from '../../assets/others/authentication.png'; // The textured background
import { Link } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

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
    };

    const handleCaptchaValidation = () => {
        const userCaptcha = captchaRef.current.value;
        const isCaptchaValid = validateCaptcha(userCaptcha);
        if (isCaptchaValid) {
            setDisabled(false);
        } else {
            alert("Invalid Captcha!");
        }
    };

    return (
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

                            <button onClick={handleCaptchaValidation} className="btn mb-2 btn-sm mt-2">Validate Captcha</button>
                            
                            <input 
                                type="text"
                                ref={captchaRef} 
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
                                disabled={disabled} 
                            />
                        </div>
                    </form>

                    <div className="text-center pb-6">
                        <p className="text-[#D1A054]">
                            <small>New here? <Link className="font-bold" to="/signup">Create a New Account</Link></small>
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

export default Login;