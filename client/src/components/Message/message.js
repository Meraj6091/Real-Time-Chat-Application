import React from 'react';
import './message.css';

function Message({ message, name }) {
    const { user, text } = message;
    let isSendByCurrentUser = false;
    const trimName = name.trim().toLowerCase();
    if (user === trimName) {
        isSendByCurrentUser = true;
    }
    return isSendByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10"> {trimName}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{text}</p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{text}</p>
            </div>
            <p className="sentText pl-10"> {user}</p>
        </div>
    );
}

export default Message;
