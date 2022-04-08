import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import MessageBrowser from './MessageBrowser';

import { createChat } from "../../store/chat";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-regular-svg-icons";

import MessageForm from './MessageForm'

function MessageModal({ sessionUser, profUserId }) {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const chats = useSelector((state) => state.chats)
    const arrChat = Object.values(chats)
    let myChat = arrChat?.filter(chat => {
        if ((chat.user_a === +profUserId && chat.user_b === sessionUser.id) || (chat.user_a === sessionUser.id && chat.user_b === +profUserId)) return true
    })

    const createMyChat = async () => {
        myChat = await dispatch(createChat({
            user_a: +profUserId,
            user_b: sessionUser.id
        }))

    }

    if (myChat.length === 0) {
        myChat = createMyChat()
    }


    const messagesObj = useSelector((state) => state.messages)
    const messObj = Object.values(messagesObj)
    const messages = messObj.filter(({ chat_id }) => chat_id === myChat[0]?.id)

    const handleClick = async (e) => {
        setShowModal(true)
    }




    return (
        <>
            <button onClick={handleClick} className="addButton" >Message</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h3>Chat</h3>
                    <MessageBrowser messages={messages} />
                    <MessageForm chat_id={myChat[0]?.id} />
                </Modal>
            )}
        </>
    );
}

export default MessageModal;
