import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2";

function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form" id="loginForm">
            <div className="fields">
                <h2 className="formElemTit">ENTER LOGIN</h2>
                <input type="text" className="formElem" id='loginInp' value={login}
                       onChange={(e) => setLogin(e.target.value)}
                />

                <h2 className="formElemTit">ENTER PASSWORD</h2>
                <input type="password" className="formElem" id='passInp' value={password}
                       onChange={(e) => setPassword(e.target.value)}

                />
                <p>
                    <button className="formElem" onClick={sendLoginQuery} id="submitButton">LOGIN</button>
                </p>
            </div>

            <p><Link to="/register" className="formElem" id="refer">New user? Register</Link></p>

        </div>

    )
    function sendLoginQuery() {
        if (login == null || password == null) return
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password}),
        };
        fetch('http://localhost:8080/try_login', requestOptions)
            .then(async result => {
                if (result.status === 200) {
                    localStorage.setItem('login', login)
                    let s = await result.json()
                    localStorage.setItem('Bearer', s.JWT)
                    window.location.href = "/table"
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong login or password:(',
                    })
                }
            })
            .catch(e => alert(e))

    }

}
export default LoginPage