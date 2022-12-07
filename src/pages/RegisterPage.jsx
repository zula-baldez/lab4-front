import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Swal from "sweetalert2";


function RegisterPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="form" id="registerForm">
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
                    <button className="formElem" onClick={sendRegisterQuery} id='submitButton'>REGISTER</button>
                </p>
            </div>
            <p><Link to="/login" className="formElem" id="refer">Go back</Link></p>

        </div>

    )
    function sendRegisterQuery() {
        if (login == null || password == null) return
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password}),
        };
        fetch('http://localhost:8080/try_register', requestOptions)
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
                        text: 'This login is not unique:(',
                    })
                }
            })
            .catch(e => alert(e))

    }

}

export default RegisterPage