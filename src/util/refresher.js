import {BASE_URL} from "../index.jsx";

export function refresher() {


    if(localStorage.getItem('refresh') == null) {
        return false
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({refresh: localStorage.getItem('refresh')}),
    };


    return fetch(BASE_URL + '/access', requestOptions)
        .then(async result => {
            if (result.status === 200) {
                let s = await result.json()
                localStorage.setItem('Bearer', s.access)
                return true
            } else {
                return false
            }
        })
        .catch(e => {
            return false
        })


}