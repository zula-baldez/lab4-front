import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Graph from "../elements/Graph";
import Table from "../elements/Table";
import Input from "../elements/Input";

function TablePage() {

    return (
        <div>
            <Graph/>
            <Input/>
            <Table/>
        </div>
    )



}

export default TablePage