import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {sendAttempt} from "./Graph";
import {updateR} from "../pages/TablePage";

function Input() {
    const [x, setX] = useState(0);

    const [y, setY] = useState(0);

    const [r, setR] = useState(0);

    const dispatcher = useDispatch()


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
                       onChange={(e) => validateR(e, setR, dispatcher)}/>
            </div>
            <p>
                <button onClick={() => sendAttempt(x, y, r, dispatcher)}>Send Data!</button>
            </p>
            <p>
                <button onClick={goLogin}>Go to start!</button>
            </p>
        </div>
    )

}

function validateCoordinate(e, setCoord) {
    if (e.target.value < -3 || e.target.value > 3 || !/^[0-9]*[,.]?[0-9]*$/.test(e.target.value)) {
        return
    } else {
        setCoord(e.target.value)
    }
}

function validateR(e, setR, dispatcher) {
    if (e.target.value < 0 || e.target.value > 3 || !/^[0-9]*$/.test(e.target.value)) {
        return
    } else {
        setR(e.target.value)
        if (e.target.value > 0 && e.target.value <= 3)
            dispatcher(updateR(e.target.value))
    }
}

function goLogin() {
    localStorage.setItem('login', null)
    localStorage.setItem('Bearer', null)

    window.location.href = "/login"
}

export default Input