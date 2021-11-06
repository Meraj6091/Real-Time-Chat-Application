import React from 'react';
import './input.css';
function Input({ message, setMessage, sendMessage }) {
    return (
        <div>
            <form className="form">
                <input className="input" type="text" placeholder="Type..." value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={(event) => event.key === 'Enter' && sendMessage(event)} />
                <button className="sendButton" onClick={(event) => sendMessage(event)}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Input;
