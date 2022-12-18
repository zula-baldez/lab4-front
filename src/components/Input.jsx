import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {sendAttempt} from "./Graph";
import {updateR} from "../state/state";
import {useNavigate} from "react-router-dom";

function Input() {
    const [x, setX] = useState(0);

    const [y, setY] = useState(0);

    const r = useSelector(state => state.r)

    const navigate = useNavigate();
    const dispatcher = useDispatch()

    function goLogin() {
        localStorage.setItem('login', null)
        localStorage.setItem('Bearer', null)
        localStorage.setItem('refresh', null)
        navigate('/login')
    }

    return (
        <div className="inputs">
            <div className="fields">
                <p className="variable_name">X</p>
                <input maxLength={10} className="formElem" id="enter-x" type="text" value={x}
                       onChange={(e) => validateCoordinate(e, setX)}/>

                <p className="variable_name">Y</p>
                <input maxLength={10} className="formElem" id="enter-y" type="text" value={y}
                       onChange={(e) => validateCoordinate(e, setY)}/>

                <p className="variable_name">R</p>
                <input maxLength={10} className="formElem" id="enter-r" type="text" value={r}
                       onChange={(e) => validateR(e, dispatcher)}/>
            <p>
                <button id = "send-data" onClick={() => sendAttempt(x, y, r, dispatcher, navigate)}>Send Data!</button>
            </p>
            <p>
                <button id="go-back" onClick={goLogin}>Go to start!</button>
            </p>
            </div>

        </div>
    )

}

function validateCoordinate(e, setCoord) {
    if (e.target.value === '-') {
        setCoord(e.target.value)
    }
    if (e.target.value < -3 || e.target.value > 3 || !/^-?[0-9]*[.]?[0-9]*$/.test(e.target.value)) {
        return
    } else {
        setCoord(e.target.value)
    }
}

function validateR(e, dispatcher) {
    if (e.target.value < 0 || e.target.value > 3 || !/^[0-9]*$/.test(e.target.value)) {
        return
    } else {
        if (e.target.value >= 0 && e.target.value <= 3)
            dispatcher(updateR(e.target.value))
    }
}



export default Input