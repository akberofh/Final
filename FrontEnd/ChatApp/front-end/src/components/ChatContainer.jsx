import React, { useEffect, useRef, useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";
import { FaGithub } from "react-icons/fa";

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const socketio = socketIOClient("http://localhost:3002");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketio.on("chat", (chats) => {
      setChats(chats);
    });

    socketio.on('message', (msg) => {
      setChats((prevChats) => [...prevChats, msg])
    })

    return () => {
      socketio.off('chat')
      socketio.off('message')
    }
  }, []);

  const addMessage = (chat) => {
    const newChat = {
      username: localStorage.getItem("user"),
      message: chat,
      avatar: localStorage.getItem("avatar"),
      password: localStorage.getItem("password"),
      email: localStorage.getItem("email"),
    };
    socketio.emit('newMessage', newChat)
  };

  const Logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem('avatar')
    localStorage.removeItem('password')
    localStorage.removeItem('email')
    setUser('')
    setEmail('')
  }

  return (
    <div>
      {user ? (
        <div className="home">
          <div className="chats_header">
            <h4>Username: {user}</h4>
            
           
            <p>
              <FaGithub className="chats_icon" /> Code With Akberofh
            </p>
            <p className="chats_logout" onClick={Logout}>
              <strong>Logout</strong>
            </p>
          </div>
          <ChatLists chats={chats} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser}  />
      )}
    </div>
  );
};

export default ChatContainer;
