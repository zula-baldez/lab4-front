

import React from 'react'
import {Helmet} from "react-helmet";

function Graph() {
    return (

        <div className="rainbow-box">
            <Helmet>
                <script src = "./grapher.js"/>
            </Helmet>
            <div className="card">
                <div id="graph-back"></div>
                <canvas id="graph" width="350" height="350">
                </canvas>
            </div>
        </div>

    )


}
export default Graph