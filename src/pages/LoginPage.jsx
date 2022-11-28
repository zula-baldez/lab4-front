import React, {useState} from 'react'
import {Link} from 'react-router-dom'

function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form" id="loginForm">
            <h2 className="formElem">ENTER LOGIN</h2>
            <input type="text" className="formElem" id = 'loginInp' value = {login}
                   onChange={(e) => setLogin(e.target.value)}
            />

            <h2 className="formElem">ENTER PASSWORD</h2>
            <input type="password" className="formElem" id='passInp' value = {password}
                   onChange={(e) => setPassword(e.target.value)}

            />

            <p><button className="formElem" onClick={sendLoginQuery}>LOGIN</button></p>
            <p><Link to="/register" className="formElem">NEW USER? REGISTER</Link></p>

        </div>

    )
    function sendLoginQuery() {
        if (login == null || password == null) return
        const requestOptions = {
            method: 'POST',
//          mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password}),
        };
        fetch('http://localhost:8080/try_login', requestOptions)
            .then(result => {
                if(result.status === 200) {
                    window.location.href = "/table"
                } else {
                    //todo erreoro
                }
            })
            .catch(e => alert(e))

    }

}
export default LoginPage