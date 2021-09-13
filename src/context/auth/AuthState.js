import reactDom from 'react-dom';
import AuthContext from './authContext';
import { useState } from 'react'; 

const AuthState = (props) => {

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
