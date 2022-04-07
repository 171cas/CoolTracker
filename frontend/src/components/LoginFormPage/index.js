import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginFormPage.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();


    const handleClickDemo = async (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push("/home")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        history.push("/home")
    }

    return (
        <div className='loginContainer'>
            <form onSubmit={handleSubmit} className='loginFormPage'>
                {errors.length ? <p className='important'>The provided credentials were invalid</p> : <></>}
                <label className="singleLine">
                    <span>Login</span>
                    <input
                        placeholder='Username/Email'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className="singleLine">
                    <span>Password</span>
                    <input
                        placeholder='Password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className="LoginDemo">

                    <button type="submit" className='greyButton'>Log In</button>
                    <button onClick={handleClickDemo} className='greyButton'>Demo User</button>
                </div>
            </form>
        </div>
    );
}

export default LoginFormPage;
