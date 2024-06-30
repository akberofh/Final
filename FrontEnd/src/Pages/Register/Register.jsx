import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Redux/Slice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Redux/Slice/authSlice";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import bmw from '../../Components/assets/banner-car.png'
import axios from "axios";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setPhoto] = useState(null);
    const [userType, setUserType] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (userInfo) {
            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
        }
    }, [navigate, userInfo, location.state]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (userType === "Admin" && secretKey !== "ADMIN") {
            alert("Invalid Admin");
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('userType', userType);
            if (photo) {
                formData.append('photo', photo);
            }

            const res = await register(formData).unwrap();
            dispatch(setCredentials({ ...res }));

            const apiUrl = 'https://66486ec72bb946cf2fa08f2c.mockapi.io/wishlist';

            const jsonPayload = {
                name,
                email,
                password,
                userType,
                photo
            };

            await axios.post(apiUrl, jsonPayload);

            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        maxSize: 20971520, // 20 MB limit
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                if (file.size <= 20971520) { // Check if file size is within limit
                    setPhoto(file);
                } else {
                    toast.error('File size exceeds 20 MB limit');
                }
            }
        }
    });

    const handleClearUploadPhoto = () => {
        setPhoto(null);
    };

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center p-12">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-5xl">
                <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900">Car Rental Registration</h1>
                <form onSubmit={handleRegister} className="space-y-8">
                    <div className="flex justify-center mb-6">
                        <label className="inline-flex items-center mr-6">
                            <input
                                type="radio"
                                name="UserType"
                                value="User"
                                onChange={(e) => setUserType(e.target.value)}
                                className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-xl text-gray-700">User</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="UserType"
                                value="Admin"
                                onChange={(e) => setUserType(e.target.value)}
                                className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-xl text-gray-700">Admin</span>
                        </label>
                    </div>
                    {userType === "Admin" && (
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Secret Key</label>
                            <input
                                type="text"
                                placeholder="Secret Key"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="flex-grow">
                            <label className="block text-lg font-medium text-gray-700">Photo</label>
                            <div {...getRootProps({ className: 'dropzone border border-dashed border-gray-300 rounded-md px-4 py-2 flex justify-center items-center cursor-pointer' })}>
                                <input {...getInputProps()} />
                                <p className="text-lg text-gray-600 text-center truncate">
                                    {photo ? photo.name : (isDragActive ? "Drop the files here..." : "Drag 'n' drop some files here, or click to select files")}
                                </p>
                                {photo && (
                                    <button type="button" className="text-lg ml-2 text-red-600 hover:text-red-800" onClick={handleClearUploadPhoto}>
                                        <IoClose />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="w-1/3">
                            <img src={bmw} alt="BMW Car" className="w-full rounded-lg shadow-lg" />
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isLoading ? 'Creating User' : 'Register'}
                    </button>
                </form>
                <p className="text-center mt-6 text-lg text-gray-600 cursor-pointer" onClick={() => navigate('/login')}>
                    <span>Already have an account? Login</span>
                </p>
            </div>
        </section>
    );
};

export default Register;
