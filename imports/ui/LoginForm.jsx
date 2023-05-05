import {Meteor} from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const loginHandler = (event) => {
        event?.preventDefault();
        if(!userName || userName.length === 0 || !password || password.length === 0){
            return;
        }
        console.log(userName,password);
        Meteor.loginWithPassword(userName,password);
    }
    return (
        <form onSubmit={loginHandler}>
            <div>
                <label htmlFor="userName"></label>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password"></label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button type="submit" >Login</button>
        </form>
    )
}