import reactDom from 'react-dom';
import AuthContext from './authContext';
import { useState } from 'react'; 

const AuthState = (props) => {
    const host = "http://localhost:5000";

    const [token, setToken] = useState({"token":""})

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
        makeRestCall(url, {email:un, password:pwd}, 'POST')
            .then(data => {
                console.log("login response = ", data);  
                if(data.authToken){
                    //TODO - backend api change
                    //for success flag - true/false
                    setToken({token : data.authToken});
                }     
            });
    }

    const doSignup = async (un, pwd) => {
        console.log("do signup..!!");
        
    }

    return (
        <AuthContext.Provider value={{doLogin, doSignup}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
