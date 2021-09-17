import reactDom from 'react-dom';
import AuthContext from './authContext';
import { useState } from 'react'; 

const AuthState = (props) => {
    const host = "http://localhost:5000";

    const [authRes, setAuthRes] = useState({"success" : "", "token" : "", "error" : ""})

    async function makeRestCall(url = '', data = {}, method){
        const response = await fetch(url, {
            method : method,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data)
        });
        const resp = await response.json()
        return resp;
    }

    const doLogin = async (un, pwd) => {
        console.log("do login..!!", un, pwd);
        const url = `${host}/api/auth/login`;
        let resp = await makeRestCall(url, {email:un, password:pwd}, 'POST');
        console.log("login response = ", resp);  
        
        if(resp.success){
            resp["error"] = "";
            setAuthRes(resp);
        } else{
            resp["token"] = "";
            setAuthRes(resp);
        }
        // if(resp.success){
        //     //TODO - add success also in setToken/setAuth
        //     setAuthRes({success: resp.success, token : resp.authToken})
        //     //return data.authToken;
        // }else{
        //     // setToken({token : ""});
        // }   
           
    }

    const doSignup = async (name, un, pwd) => {
        console.log("do signup..!!");
        //TODO
    }

    return (
        <AuthContext.Provider value={{authRes, doLogin, doSignup}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
