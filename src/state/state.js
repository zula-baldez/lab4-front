import axios from "axios";
import {BASE_URL} from "../index.jsx";
import {refresher} from "../util/refresher.js";
import Swal from "sweetalert2";

export const defaultState = {
    table: [],
    r: 0
}
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const UPDATE_R = 'UPDATE_R'
export const updateRequest = () => {
    return {
        type: FETCH_REQUEST

    }
}
export const updateSuccess = (table, size) => {
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
//if we wanna -1 page it means that we want to fetch last page
export const fetchDate = (page, count, navigate) => {
    return function sendData(dispatcher) {
        dispatcher(updateRequest())

        const headers = {
            'Authorization': localStorage.getItem('Bearer'),
            'Access-Control-Allow-Origin': '*'
        }
        axios.post(BASE_URL + '/get-table-data', {
            page: page,
            count: count
        }, {
            headers: headers

        })
            .then(async result => {
                    if (result.status === 200) {
                        let s = result.data.attemptList;
                        let pages = Math.ceil(result.data.tableSize / 10)
                        dispatcher(updateSuccess(s, pages))
                    }
                }
            )
            .catch(async e => {
                    if (refresher() === true) {
                        sendData(dispatcher);
                    } else {
                        await Swal.fire({
                            //showConfirmButton: false, //hide OK button
                            icon: 'error',
                            title: 'Oops...',
                            text: 'you are not logged in:(',
                            //footer: '<a href="/login">Go to login page</a>',
                        }).then(function() {
                            navigate('/login')
                        });
                    }
                }
            )
    }
}
