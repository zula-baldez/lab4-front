import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchDate} from "../pages/TablePage";
import ReactPaginate from "react-paginate";

function AttemptTable() {

    let table = useSelector((state) => state.table);
    let pages = useSelector((state) => state.pages)


    const dispatch = useDispatch()

    return (
        <div id="results" className="table-container">


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
                    dispatch(fetchDate(e.selected, 10))
                }}
                pageCount={pages}
                containerClassName='pagination'
                pageClassName='page-item'
                pageLinkClassName='page-link'


            />


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


        </div>
    )

}

function Attempt({attempt: {attempt, x, y, r, hit, workTime, startTime}}) {

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