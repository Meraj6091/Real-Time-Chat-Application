import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './chat.css';
import InfoBar from '../InfoBar/infoBar';
import Input from '../Input/input';
import Messages from '../Messages/messages';

let socket;
const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(window.location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join', { name, room }, () => {});

        //useEffect cleanUp func
        return () => {
            socket.emit('disconnect');
            socket.off();
        };
    }, [window.location.search, ENDPOINT]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [message]);
    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
            console.log(message, messages);
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                {/* <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={(event) => event.key === 'Enter' && sendMessage(event)} /> */}
            </div>
        </div>
    );
};

export default Chat;
