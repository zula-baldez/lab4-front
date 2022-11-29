import React, {useEffect, useState} from 'react'

function AttemptTable() {
    const [table, setTable] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: localStorage.getItem('login'), password: localStorage.getItem('password')}),
        };


        fetch('http://localhost:8080/get_table_data', requestOptions)
            .then(async result => {
                    if (await result.status === 200) {
                        let s  = await result.json()

                        setTable(s)
                    } else {
                        //todo
                    }
                }
            )
            .catch(e => alert(e))

    }, []);


    return (
        <div id="results" className="table">
            <h1>Results</h1>
            <table>
                <thead>
                <tr>
                    <td>Attempt</td>
                    <td>X</td>
                    <td>Y</td>
                    <td>R</td>
                    <td>Result</td>
                    <td>Work time</td>
                    <td>Start time</td>
                </tr>
                </thead>
                <tbody>

                { table.map(attempt => <Attempt  attempt={attempt} />) }

                </tbody>
            </table>


        </div>
    )

}
function Attempt({attempt:{attempt, x, y, r, hit, workTime, startTime} }) {

    return (
        <tr>
            <td>{attempt}</td>
            <td>{x}</td>
            <td>{y}</td>
            <td>{r}</td>
            <td>{hit.toString()}</td>
            <td>{workTime}</td>
            <td>{new Date(startTime).toLocaleString()}</td>

        </tr>
    )
}

export default AttemptTable