import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
let socket;
const ENDPOINT = 'http://localhost:5000'; // Your backend URL
const Chat = () => {
  const [name,setName] = useState('')
  const [room,setRoom] = useState('')
  const [message,setMessage] = useState('')
  const [messages,setMessages] = useState([])
  const location = useLocation();
  const [users, setUsers] = useState('');
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
     
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      socket.off();
    
    }
  }, [ENDPOINT, location.search]);
  
  useEffect(()=>{
socket.on('message',(message)=>{
  setMessages([...messages,message])///all previous message and now message store in array

})
socket.on("roomData", ({ users }) => {
  setUsers(users);
});
  },[messages])

  ///function for sending msg
function sendMessage(event){
event.preventDefault();
if(message){
  socket.emit('sendMessage',message ,()=>setMessage(''))
}
}
// console.log(message,messages)

  return (
    
    <div className="outerContainer">
      <div className="container">
    <InfoBar room={room} />
<Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
<Messages messages={messages} name={name}/>

  </div>
  <TextContainer users= {users} />
</div>
  
  );
};

export default Chat;
