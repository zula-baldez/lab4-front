import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
import {BASE_URL} from "../index";

function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const registerClick = async () => navigate('/register');

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
                    <button className="formElem" onClick={sendLoginQuery} id="submitButton">Login</button>
                </p>
                <p><button className="formElem" id="refer" onClick={registerClick}>Register new account</button></p>
            </div>


        </div>

    )
    function sendLoginQuery() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'

            },
            body: JSON.stringify({login: login, password: password}),
        };
        fetch(BASE_URL + '/try-login', requestOptions)
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
                            text: 'Wrong password or login:(',
                        })
                    } else
                        await Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong:(',
                        })
                }
            })
            .catch(async e => {
                console.log(e)
            })

    }

}
export default LoginPage