import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CommentBrowser from './CommentBrowser';
import WorkoutDetail from '../WorkoutDetail';

function CommentModal({ comments, users }) {
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
                </Modal>
            )}
        </>
    );
}

export default CommentModal;
