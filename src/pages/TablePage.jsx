import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Graph from "../elements/Graph";
import AttemptTable from "../elements/AttemptTable";
import Input from "../elements/Input";

function TablePage() {

    return (
        <div>
            <Graph/>
            <Input/>
            <AttemptTable/>
        </div>
    )



}

export default TablePage