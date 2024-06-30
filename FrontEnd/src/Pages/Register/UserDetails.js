import React, { useEffect, useState } from "react";
import AdminHome from "./Adminhome";
import Dashboard from "../Dashboard/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.allUsers) {
          setUserData(data.allUsers);
          if (data.allUsers.userType === "Admin") {
            setIsAdmin(true);
          }
        }

        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        toast.error("Error fetching user data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <div>
        <ToastContainer />
        <h3>No user data found.</h3>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div>
        <ToastContainer />
        <Dashboard userData={userData} />
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <AdminHome userData={userData} />
    </div>
  );
}
