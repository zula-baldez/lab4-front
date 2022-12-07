import React from 'react'
import Graph from "../components/Graph";
import AttemptTable from "../components/AttemptTable";
import Input from "../components/Input";
import {Provider} from "react-redux";
import * as redux from "redux";
import {createStore} from "redux";
import axios from "axios";
import Swal from "sweetalert2";

const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default

const defaultState = {
    table: [],
    r: 0
}
const FETCH_REQUEST = 'FETCH_REQUEST'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const UPDATE_R = 'UPDATE_R'
const updateRequest = () => {
    return {
        type: FETCH_REQUEST

    }
}
const updateSuccess = (table, size) => {
    return {
        type: FETCH_SUCCESS,
        table: table,
        pages: size
    }
}
export const updateR = r => {
    return {
        type: "UPDATE_R",
        R: r
    }
}
const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case FETCH_REQUEST: {
            return {
                ...state,
            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                table: action.table,
                pages: action.pages
            }
        }
        case UPDATE_R: {
            return {
                ...state,
                r: action.R
            }
        }
        default:
            return {...state}
    }
}


let first = true

//if we wanna -1 page it means that we want to fetch last page
export const fetchDate = (page, count) => {
    return function sendData(dispatcher) {
        dispatcher(updateRequest())

        const headers = {
            'Authorization': localStorage.getItem('Bearer'),
            'Access-Control-Allow-Origin': '*'
        }
        axios.post('http://localhost:8080/get_table_data', {
            login: localStorage.getItem('login'),
            page: page,
            count: count
        }, {
            headers: headers

        })
            .then(result => {

                    let s = result.data.attemptList;
                    let pages = Math.ceil(result.data.tableSize / 10)
                    dispatcher(updateSuccess(s, pages))

                }
            )
            .catch(async e => {
                if (first) {
                    await Swal.fire({
                        showConfirmButton: false, //hide OK button
                        icon: 'error',
                        title: 'Oops...',
                        text: 'you are not logged:(',
                        footer: '<a href="/login">Go to login page</a>',                    })


                }
            })
    }
}


function TablePage() {


    const store = createStore(reducer, applyMiddleware(thunkMiddleware))
    store.dispatch(fetchDate(-1, 10))

    return (
        <div>
            <Provider store={store}>
                <Graph/>
                <Input/>
                <AttemptTable/>
            </Provider>
        </div>
    )

}


export default TablePage