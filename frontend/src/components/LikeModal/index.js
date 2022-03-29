import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LikeBrowser from './LikeBrowser';

function LikeModal({ likes, users }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowModal(true)} style={{ cursor: 'pointer', borderBottom: 'none' }}>{likes.length}</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LikeBrowser likes={likes} users={users} />
                </Modal>
            )}
        </>
    );
}

export default LikeModal;
