import React from 'react'
import Graph from "../components/Graph";
import AttemptTable from "../components/AttemptTable";
import Input from "../components/Input";
import {Provider} from "react-redux";
import * as redux from "redux";
import {createStore} from "redux";
import {fetchDate} from "../state/state";
import {reducer} from "../reducers/reducer";
import {useNavigate} from "react-router-dom";

const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default




function TablePage() {

    const navigate = useNavigate()
    const store = createStore(reducer, applyMiddleware(thunkMiddleware))
    store.dispatch(fetchDate(-1, 10, navigate))

    return (
        <div>
            <Provider store={store}>
                <div className="graphContainer">
                    <Graph/>
                    <Input/>
                </div>
                <AttemptTable/>
            </Provider>
        </div>
    )

}


export default TablePage