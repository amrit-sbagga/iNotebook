import AuthContext from './authContext';
import { useState } from 'react'; 

const AuthState = (props) => {
    const host = "http://localhost:5000";

    let initialData = {"success" : "", "token" : "", "error" : ""}
    const [authRes, setAuthRes] = useState(initialData)

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
        //setAuthRes(initialData);
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
        //setAuthRes(initialData);
        console.log("do login..!!", name, un, pwd);
        const url = `${host}/api/auth/createuser`;
        let resp = await makeRestCall(url, {name:name, email:un, password:pwd}, 'POST');
        console.log("signup response = ", resp);  
        
        if(resp.success){
            resp["error"] = "";
            setAuthRes(resp);
        } else{
            resp["token"] = "";
            setAuthRes(resp);
        }
    }

    return (
        <AuthContext.Provider value={{authRes, doLogin, doSignup}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
