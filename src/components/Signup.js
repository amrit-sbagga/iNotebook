import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authContext from '../context/auth/authContext';

const Signup = (props) => {

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

        if(register.password === register.cpassword){
            await doSignup(register.name, register.email, register.password);
            console.log("authRes after signup =>", authRes);
            if(authRes.success && authRes.success !== ""){
                //redirect
                localStorage.setItem('token', authRes.authToken);
                history.push("/");
                props.showAlert("Account created successfully", "success");
            } else{
                //alert - wrong creds
                //alert("Invalid credentials.")
                //get error from authRes.error
                if(authRes.errors && authRes.errors.length > 0){
                    //alert(authRes.errors[0].msg);
                    props.showAlert(authRes.errors[0].msg, "danger")
                }else if(authRes.error){
                    //alert(authRes.error);
                    props.showAlert(authRes.error, "danger");
                } else {
                    console.log("Some error occured.");
                }   
            }
        }else{
            console.log("passwords doesn't match.");
        }    

    }

    return (
        <div>
            <form onSubmit={handleSubmit} ref={ref}>
            <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name"
                         placeholder="Name" onChange={onChange} value={register.name} required minLength={3}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"
                         aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={register.email} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                         placeholder="Password" onChange={onChange} value={register.password} required minLength={5}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword"
                         placeholder="Confirm Password" onChange={onChange} value={register.cpassword} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup
