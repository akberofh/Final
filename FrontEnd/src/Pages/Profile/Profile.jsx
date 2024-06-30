import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../../Redux/Slice/authSlice";
import { useLogoutMutation, useUpdateUserMutation } from "../../Redux/Slice/userApiSlice";
import axios from "axios";
import { AiOutlineLogout, AiOutlineArrowLeft } from 'react-icons/ai';

const Profile = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const resetInputs = () => {
        setEmail("");
        setName("");
        setPassword("");
        setConfirmPassword("");
        setPhoto(null);
        setPhotoPreview(null);
    };

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());

            resetInputs();

            const deleteUrl = `https://66486ec72bb946cf2fa08f2c.mockapi.io/wishlist/?search=${email}`;

            const response = await axios.get(deleteUrl);
            const userId = response.data[0].id;

            const deleteApiUrl = `https://66486ec72bb946cf2fa08f2c.mockapi.io/wishlist/${userId}`;

            await axios.delete(deleteApiUrl);

            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                if (photo) {
                    formData.append('photo', photo);
                }

                const res = await updateUser(formData).unwrap();

                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
                setPassword('');
                setConfirmPassword('');
                navigate("/");
            } catch (error) {
                toast.error(error.data.message || error.message);
            }
        }
    };

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPhotoPreview(`data:image/jpeg;base64,${userInfo.photo}`);
        }
    }, [userInfo]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="w-full max-w-full bg-white rounded-lg shadow-md p-10 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 flex flex-col items-center mb-6 lg:mb-0">
                    {photoPreview && (
                        <img
                            src={photoPreview}
                            alt="Profile Preview"
                            className="h-60 w-60 object-cover rounded-full mb-6"
                        />
                    )}
                    <h2 className="text-2xl font-medium mb-2">{name}</h2>
                    <p className="text-lg text-gray-500">{email}</p>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col items-center">
                    <div className="flex justify-between mb-8 w-full">
                        <button 
                            onClick={() => navigate("/")} 
                            className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition duration-200 flex items-center"
                        >
                            <AiOutlineArrowLeft className="mr-2" /> Back
                        </button>
                        <button 
                            onClick={handleLogout} 
                            className="px-6 py-3 bg-red-500 text-white text-lg rounded hover:bg-red-600 transition duration-200 flex items-center"
                        >
                            <AiOutlineLogout className="mr-2" /> Logout
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 w-full">
                        <div className="flex flex-col items-center">
                            <label className="mb-3 text-lg font-medium">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 text-lg"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="mb-3 text-lg font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 text-lg"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="mb-3 text-lg font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 text-lg"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="mb-3 text-lg font-medium">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 text-lg"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="mb-3 text-lg font-medium">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="w-3/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-50 text-lg"
                            />
                        </div>
                        <button style={{marginLeft:"120px"}}
                            type="submit" 
                            className="w-3/4 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600 transition duration-200"
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
