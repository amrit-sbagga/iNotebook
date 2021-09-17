import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const Signup = () => {

    const context = useContext(authContext);
    const { authRes, doSignup } = context;

    const ref = useRef(null);
    let history = useHistory();

    let initialState = {name: "", email : "", password : "", cpassword:""}
    const [register, setRegister] = useState(initialState)

    const onChange = (e) => {
        setRegister({...register, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle submit...!!");

        // first check if password & confirm pwd are same

        await doSignup(register.name, register.email, register.password);
        console.log("authRes after signup =>", authRes);

    }

    return (
        <div>
            <form onSubmit={handleSubmit} ref={ref}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name"
                         placeholder="Name" onChange={onChange} value={register.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"
                         aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={register.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                         placeholder="Password" onChange={onChange} value={register.password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"
                         placeholder="Confirm Password" onChange={onChange} value={register.cpassword}/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
