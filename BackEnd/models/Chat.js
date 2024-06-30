import mongoose from 'mongoose';


const chatSchema = new mongoose.Schema({
    username: String,
    message: String,
    avatar: String,
    password:  String,
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('message', chatSchema);

export default Chat;
