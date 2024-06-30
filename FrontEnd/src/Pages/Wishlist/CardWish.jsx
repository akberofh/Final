import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeTodo, setTodos } from '../../Redux/Slice/todoSlice';
import { useGetTodosQuery, useDeleteTodoMutation } from '../../Redux/Slice/todoApiSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CardWish = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (data) {
      dispatch(setTodos(data));
    }
  }, [navigate, userInfo, data, dispatch]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleDelete = async (id) => {
    try {
      // Optimistic update: Remove todo from UI immediately
      dispatch(removeTodo(id));

      // Send delete request to API
      await deleteTodo(id).unwrap();

      toast.success('Todo deleted successfully!');
    } catch (err) {
      console.error('Failed to delete the todo:', err);
      toast.error('Failed to delete the todo.');
      // Rollback state if delete fails (optional)
      // dispatch(addTodo(todo)); // Example rollback action
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error loading todos</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between mb-6">
        <button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
        <button onClick={() => navigate('/admin')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Admin</button>
      </div>
      <h1 className="text-3xl font-bold text-center mb-10" data-aos="fade-up">Todo List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data && data.length > 0 ? (
          data.map(item => (
            <div key={item._id} className="bg-white shadow-lg rounded-lg p-6" data-aos="fade-up">
              {item.photo && (
                <img
                  src={`data:image/jpeg;base64,${item.photo}`}
                  alt="Todo Photo"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-gray-600 mb-4">{item.category}</p>
              <p className="text-gray-600 mb-4">${item.price}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full">No todos found.</div>
        )}
      </div>
    </div>
  );
};

export default CardWish;
