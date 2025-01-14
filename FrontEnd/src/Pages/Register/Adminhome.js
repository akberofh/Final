import React, { useEffect, useState } from "react";
import { FaTrash, FaSearch } from 'react-icons/fa'; 
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAddTodoMutation, useUpdateTodoMutation } from '../../Redux/Slice/todoApiSlice';
import axios from "axios";


export default function AdminHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [catagory, setCatagory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [addTodo, { isError: addError }] = useAddTodoMutation();
  const [updateTodo, { isError: updateError, isLoading: isUpdating }] = useUpdateTodoMutation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAllUsers();
    fetchActiveUsers();
    fetchBasketItems();
    getOnlineUsers();
  }, [searchQuery]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Yorumlar getirilirken hata oluştu:', error);
      }
    };

    fetchReviews();
  }, []);

  const fetchAllUsers = () => {
    fetch(`http://localhost:8000/api/users/?search=${encodeURIComponent(searchQuery)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then(data => {
        setData(data.allUsers);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      });
  };

  const fetchActiveUsers = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setActiveUsers([userInfo]);
    }
  };

  const [onlineUsers, setOnlineUsers] = useState([])

  const getOnlineUsers = async () => {
    try {
      const res = await fetch("https://66486ec72bb946cf2fa08f2c.mockapi.io/wishlist");
      if (!res.ok) {
        throw new Error("Failed to fetch online users");
      }
      const data = await res.json();
      setOnlineUsers(data); // Assuming data is an array of online users
    } catch (error) {
      console.error("Error fetching online users:", error);
      toast.error("Error fetching online users");
    }
  };

  

  const fetchBasketItems = () => {
    const storedBasketList = localStorage.getItem('basketList');
    if (storedBasketList) {
      const basketList = JSON.parse(storedBasketList).map(item => ({
        ...item,
        userEmail: item.email
      }));
      setBasketItems(basketList);
    }
  };

  const logOut = () => {
    setIsLoggingOut(true);
    window.localStorage.clear();
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 3000);
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      fetch(`https://66486ec72bb946cf2fa08f2c.mockapi.io/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(data => {
          if (data) {
            toast("User deleted");
            setData(prevData => prevData.filter(user => user._id !== id));
          } else {
            toast.error("An error occurred while deleting the user.");
          }
        })
        .catch(error => {
          console.error("Error deleting user:", error);
          toast.error("An error occurred while deleting the user.");
        });
    }
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('catagory', catagory);
      formData.append('description', description);
      formData.append('price', price);
      if (photo) {
        formData.append('photo', photo);
      }

      if (id) {
        const updatedTodo = await updateTodo({ id, formData }).unwrap();
        dispatch({ type: 'todo/updateTodo', payload: updatedTodo });
      } else {
        const newTodo = await addTodo(formData).unwrap();
        dispatch({ type: 'todo/addTodo', payload: newTodo });
      }
      
      navigate('/carwis');
    } catch (err) {
      console.error('Failed to add/update the todo:', err);
    }
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  if (isLoggingOut) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Logging Out...</p>
      </div>
    );
  }
  
  const deleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/reviews/${id}`);
        if (response.data) {
          setReviews(reviews.filter(review => review._id !== id));
          toast.success('Review deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
        toast.error('Error deleting review');
      }
    }
  };


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
};
 


  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className={`max-w-6xl mx-auto p-6 bg-white rounded shadow-md ${userInfo.userType === 'Admin' ? 'block' : 'hidden'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Welcome Admin</h3>
          <button
            onClick={logOut}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Log Out
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data && onlineUsers
               
                .map(user => (
                  <tr key={user._id} className="text-left">
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.userType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <FaTrash
                          className="cursor-pointer text-red-600 hover:text-red-800"
                          onClick={() => deleteUser(user._id, user.name)}
                        />
                        <button
                          className={`px-2 py-1 text-xs rounded ${
                             'bg-green-500 text-white'}`}
                        >
                          {'Active'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Basket Items</h3>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {basketItems.map(item => (
                <tr key={item.id} className="text-left">
                  <td className="px-6 py-4 whitespace-nowrap ">{item.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(item.addedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`${userInfo.userType === 'Admin' ? 'hidden' : 'block'} text-center mt-8`}>
        <p className="text-gray-500">You are not authorized to view this page.</p>
      </div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">{id ? 'Update TODO' : 'Add New PRODUCT'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
          <label htmlFor="catagory" className="block text-sm font-medium text-gray-700">
            Category:
          </label>
          <select
            id="catagory"
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            <option value="Bmw">Bmw</option>
            <option value="Toyota">Toyota</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Lada">Lada</option>
            <option value="Nissan">Nissan</option>
            <option value="Chevrolet">Chevrolet</option>
          </select>
        </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="photo" className="text-sm font-medium">Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              {id ? 'Update TODO' : 'Add TODO'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="bg-gray-100 py-14 sm:pb-24">
      <div className="container px-4 mx-auto">
       
        
        <h3 className="text-xl font-semibold mt-8">Customer Reviews</h3>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews.map(review => (
                <tr key={review._id} className="text-left">
                  <td className="px-6 py-4 whitespace-nowrap">{review.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{review.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{truncateText(review.review, 10)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FaTrash style={{marginLeft:"20px"}}
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => deleteReview(review._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        {addError && <p className="mt-4 text-red-500">Error adding todo: {addError.message}</p>}
        {updateError && <p className="mt-4 text-red-500">Error updating todo: {updateError.message}</p>}
        {id && (
          <button
            type="button"
            className={`w-full py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        )}
      </div>
    </div>
  );
}
