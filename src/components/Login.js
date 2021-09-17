import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const Login = () => {
    const context = useContext(authContext);
    const { authRes, doLogin } = context;

    let history = useHistory();

    const ref = useRef(null);

    let initialState = {email : "", password : ""}
    const [creds, setCreds] = useState(initialState)

    const onChange = (e) => {
        setCreds({...creds, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle submit...!!");
        await doLogin(creds.email, creds.password);
        console.log("authRes after login =>", authRes);

        if(authRes.success){
            //redirect
            localStorage.setItem('token', authRes.token);
            history.push("/");
        } else{
            //alert - wrong creds
            alert("Invalid credentials.")
        }

         //for making form empty after submit
        //ref.current.clear()
        //setCreds(initialState);
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit} ref={ref}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"
                         aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={creds.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                         placeholder="Password" onChange={onChange} value={creds.password}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
