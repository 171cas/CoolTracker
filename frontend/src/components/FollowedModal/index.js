import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory } from 'react-router-dom';

function FollowedModal({ following, userArr }) {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const value = following.length > 0
    const pointer = (following.length > 0 ? 'pointer' : '')

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div style={{ display: 'inline' }}>
                <p onClick={() => setShowModal(value)} style={{ cursor: pointer, borderBottom: 'none', width: 'fit-content' }}>Following: {following.length}
                </p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h3>Following:</h3>
                    <div className='likesCont'>
                        {following && following?.map((followed, i) => {
                            return (<NavLink
                                onClick={closeModal}
                                to={`/user/${followed.followed_id}`}
                                className='userLink'
                                key={followed.id}
                                style={{ textDecoration: 'none' }}
                            ><p
                                className='likesUserText'
                            >@{userArr.find(user => user.id === followed.followed_id).username}</p></NavLink>)
                        })}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default FollowedModal;
