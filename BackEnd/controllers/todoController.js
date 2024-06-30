import Todo from "../models/todoModel.js";
import generateToken from "../utils/generateToken.js";


const addUserTodo = async (req, res) => {
  try {
    const { title, description, price,catagory } = req.body;
    let photo = '';

    if (req.file) {
      photo = req.file.buffer.toString('base64');
    }

    // Assuming `user` is fetched or defined elsewhere in your middleware
    if (req.user) {
      const todo = await Todo.create({
        title,
        description,
        price,
        photo,
        catagory,
        user_id: req.user._id,
      });

      res.status(201).json(todo);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserTodos = async (req, res) => {
  try {
    if (req.user) {
      const userTodos = await Todo.find({ user_id: req.user._id });
      res.status(200).json(userTodos);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteUserTodo = async (req, res) => {
  try {
    if (req.user) {
      const deleteTodo = await Todo.findById(req.params.id);

      if (deleteTodo && deleteTodo.user_id.toString() === req.user._id.toString()) {
        await Todo.deleteOne({ _id: req.params.id });
        res.json({ message: `${req.params.id} id-li post silindi` });
      } else {
        res.status(404).json({ message: 'Todo not found or unauthorized' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoProfile = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (todo) {
      todo.title = req.body.title || todo.title;
      todo.price = req.body.price || todo.price;
      todo.catagory = req.body.catagory || todo.catagory;
      todo.description = req.body.description || todo.description;
      todo.photo = req.file ? req.file.buffer.toString('base64') : todo.photo;

      const updatedTodo = await todo.save();

      res.json({
        _id: updatedTodo._id,
        title: updatedTodo.title,
        description: updatedTodo.description,
        photo: updatedTodo.photo,
        catagory: updatedTodo.catagory,
      });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export { addUserTodo, getUserTodos, deleteUserTodo, updateTodoProfile };