import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from "react-paginate";
import {useNavigate} from "react-router-dom";
import {fetchDate} from "../state/state.js";

function AttemptTable() {

    const table = useSelector((state) => state.table);
    const pages = useSelector((state) => state.pages)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div id="results" className="table-container">
            <h1>Results</h1>
            <div className="table">

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
                    {table.map(attempt => <Attempt attempt={attempt}/>)}
                    </tbody>
                </table>
            </div>
            <ReactPaginate
                previousLabel="<= previous"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextLabel="next =>"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName={"page-item"}
                breakLinkClassName={'page-link'}
                marginPagesDisplayed={1}
                pageRangeDisplayed={4}
                onPageChange={(e) => {
                    dispatch(fetchDate(e.selected, 10, navigate))
                }}
                pageCount={pages}
                containerClassName='pagination'
                pageClassName='page-item'
                pageLinkClassName='page-link'
            />

        </div>
    )
}

function Attempt({attempt: {attempt, x, y, r, hit, workTime, startTime}}) {
    return (
        <tr>
            <td>{attempt}</td>
            <td>{x.toFixed(4)}</td>
            <td>{y.toFixed(4)}</td>
            <td>{r}</td>
            <td>{hit.toString()}</td>
            <td>{workTime}</td>
            <td>{new Date(startTime).toLocaleString()}</td>
        </tr>
    )
}

export default AttemptTable