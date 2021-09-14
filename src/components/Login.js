import React, { useContext, useRef, useState } from 'react';
import authContext from '../context/auth/authContext';

const Login = () => {
    const context = useContext(authContext);
    const { doLogin } = context;

    const ref = useRef(null);

    let initialState = {email : "", password : ""}
    const [creds, setCreds] = useState(initialState)

    const onChange = (e) => {
        setCreds({...creds, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit...!!");
        doLogin(creds.email, creds.password);
        //for making form empty after submit
        //ref.current.clear()
        setCreds(initialState);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} ref={ref}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"
                         aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={creds.email} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                         placeholder="Password" onChange={onChange} value={creds.password}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
