import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageDetail from './MessageDetail';

// import { getMessages } from "../../store/messages";
const MessageBrowser = ({ messages }) => {
    // const [seconds, setSeconds] = useState(0);
    // const dispatch = useDispatch();

    // useEffect(async () => {
    //     const interval = setInterval(() => {
    //         setSeconds(seconds => seconds + 1);
    //     }, 1500);
    //     return () => clearInterval(interval);
    // }, []);

    // useEffect(() => {
    //     dispatch(getMessages());
    // }, [seconds])

    return (
        <div className='commentsCont'>
            {messages && messages?.map((message, i) => {
                return (
                    <div key={message.id} style={{ display: 'flex', width: '100%', margin: '5px 0' }}>
                        <p className='userLink' >@{message?.User?.username}: </p>
                        <p >{message?.message}</p>
                    </div>
                )
            })}
            {messages?.length === 0 ? <p>No messages yet.</p> : ''}

            <br />
        </div>
    )
}

export default MessageBrowser;
