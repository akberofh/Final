import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.checkPassword(password))) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                photo: user.photo,
                userType: user.userType,
            });
        } else {
            res.status(400).json({ message: 'Email ya da parola hatalı' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteByIdUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const allUsers = await User.findOneAndDelete({ _id: id });
      if (!allUsers) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ allUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

const registerUser = async (req, res) => {
    try {
        const { name, email, password ,userType } = req.body;
        let photo = '';
        
        if (req.file) {
            photo = req.file.buffer.toString('base64');
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const user = await User.create({
            name,
            email,
            password,
            photo,
            userType,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                email: user.email,
                name: user.name,
                photo: user.photo,
                userType: user.userType,
            });
        } else {
            res.status(400).json({ message: "User not added" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json({ allUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: 'Çıkış Yapıldı' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        if (req.user) {
            res.json({
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                photo: req.user.photo,
                userType: res.user.userType,
            });
        } else {
            res.status(404).json({ message: 'Kullanıcı Bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.photo = req.file ? req.file.buffer.toString('base64') : user.photo;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                photo: updatedUser.photo,
            });
        } else {
            res.status(404).json({ message: 'Kullanıcı Bulunamadı' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUser,
    deleteByIdUser,
};
