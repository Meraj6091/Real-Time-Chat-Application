import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './chat.css';

let socket;
const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
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

    return <div>chat</div>;
};

export default Chat;
