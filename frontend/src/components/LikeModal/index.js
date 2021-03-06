import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LikeBrowser from './LikeBrowser';

function LikeModal({ likes, users }) {
    const [showModal, setShowModal] = useState(false);
    const value = likes.length > 0
    const pointer = (likes.length > 0 ? 'pointer' : '')
    return (
        <>
            <p onClick={() => setShowModal(value)} style={{ cursor: pointer, borderBottom: 'none' }}>{likes.length}</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h3>Liked by:</h3>
                    <LikeBrowser likes={likes} />
                </Modal>
            )}
        </>
    );
}

export default LikeModal;
