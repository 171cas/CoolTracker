import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink, useHistory } from 'react-router-dom';
import FollowerBrowser from './FollowerBrowser';

function FollowerModal({ followers, modalVal }) {
    const [showModal, setShowModal] = useState(modalVal);
    const history = useHistory();
    const value = followers.length > 0
    const pointer = (followers.length > 0 ? 'pointer' : '')
    return (
        <>
            <div style={{ display: 'inline' }}>
                <p onClick={() => setShowModal(value)} style={{ cursor: pointer, borderBottom: 'none', width: 'fit-content' }}>Followers: {followers.length}
                </p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h3>Followers:</h3>
                    <div className='likesCont'>
                        {followers && followers?.map((follower, i) => {
                            return (<NavLink to={`/user/${follower.User.id}`}
                                className='userLink'
                                key={follower.id}
                                style={{ textDecoration: 'none' }}
                            ><p
                                className='likesUserText'
                            >@{follower.User.username}</p></NavLink>)
                        })}
                    </div>
                </Modal>
            )}
        </>
    );
}

export default FollowerModal;
