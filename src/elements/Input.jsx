import React, {useState} from 'react'

function Input() {
    const [x, setX] = useState(0);

    const [y, setY] = useState(0);

    const [r, setR] = useState(0);

    return (
        <div id="inputs">
            <p className="variable_name">X</p>
            <input maxLength={10} className = "input-field" id = "enter-x" type="text" value={x}  onChange={ (e) => validateCoordinate(e, setX)}/>

            <p className="variable_name">Y</p>
            <input maxLength={10} className = "input-field" id = "enter-y" type="text" value={y}  onChange={ (e) => validateCoordinate(e, setY)}/>

            <p className="variable_name">R</p>
            <input maxLength={10} className = "input-field" id = "enter-r" type="text" value={r} onChange={ (e) => validateR(e, setR)}/>
        </div>
    )

}

function validateCoordinate(e, setCoord) {
    if(e.target.value < -3 || e.target.value > 3 || !/^[0-9]*[,.]?[0-9]*$/.test(e.target.value)) {
        return
    } else {
        setCoord(e.target.value)
    }
}
function validateR(e, setR ) {
    if(e.target.value < 0 || e.target.value > 3  || !/^[0-9]*$/.test(e.target.value)) {
        return
    } else {
        setR(e.target.value)
    }
}
export default Input