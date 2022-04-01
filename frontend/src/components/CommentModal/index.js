import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CommentBrowser from './CommentBrowser';

import CommentForm from './CommentForm'

function CommentModal({ comments, users, workoutId }) {
    const [showModal, setShowModal] = useState(false);
    const value = comments.length > 0
    const pointer = (comments.length > 0 ? 'pointer' : '')
    return (
        <>
            <p onClick={() => setShowModal(value)} style={{ cursor: pointer, borderBottom: 'none' }}>{comments.length}</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h3>Comments</h3>
                    <CommentBrowser comments={comments} users={users} />
                    <CommentForm workoutId={workoutId} />
                </Modal>
            )}
        </>
    );
}

export default CommentModal;
