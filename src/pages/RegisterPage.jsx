import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import {BASE_URL} from "../index";

function RegisterPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginClick = async () => navigate('/login');
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
                    <button className="formElem" onClick={sendRegisterQuery} id='submitButton'>Register</button>
                </p>
                <p>
                    <button className="formElem" id="refer" onClick={loginClick}>Go back</button>
                </p>
            </div>

        </div>

    )
    function sendRegisterQuery() {
        if (login == null || password == null) {
            return
        }


        if (login.length < 2 || password.length < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login and password must be at least 2!',
            })
            return
        }

        if (login.length > 15 || password.length > 15) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login and password must be not longer that 15!',
            })
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password}),
        };
        fetch(BASE_URL + '/try-register', requestOptions)
            .then(async result => {
                if (result.status === 200) {
                    let s = await result.json()
                    localStorage.setItem('Bearer', s.access)
                    localStorage.setItem('refresh', s.refresh)
                    navigate("/table")
                } else {
                    if (result.status === 400) {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Login is not unique:(',
                        })
                    } else
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong:(',
                        })
                }
            })
            .catch(e => {
                console.log(e)
            })

    }

}

export default RegisterPage