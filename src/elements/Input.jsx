import React, {useState} from 'react'

function Input() {
    const [x, setX] = useState(0);

    const [y, setY] = useState(0);

    const [r, setR] = useState(0);

    return (
        <div id="inputs">
            <p className="variable_name">X</p>
            <input className = "input-field" id = "enter-x" type="text" value={x}  onChange={(e) => setX(e.value)}/>

            <p className="variable_name">Y</p>
            <input className = "input-field" id = "enter-y" type="text" value={y}  onChange={(e) => setY(e.value)}/>

            <p className="variable_name">R</p>
            <input className = "input-field" id = "enter-r" type="text" value={r} onChange={(e) => setR(e.value)}/>
        </div>

    )
}

export default Input