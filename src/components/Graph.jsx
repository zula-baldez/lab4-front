import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchDate} from "../pages/TablePage";
import Swal from "sweetalert2";

const markWidth = 5
const arrowSize = 5
const rSize = 60
const figureColor = '#39f'

function Graph() {
    const dispatch = useDispatch()
    const table = useSelector((state) => state.table);

    let r = useSelector(state => state.r)
    useEffect(() => {
        let canvas = document.getElementById('graph')
        let ctx = canvas.getContext('2d')
        let width = canvas.width
        let height = canvas.height

        function drawGraph() {
            drawFigure()
            drawPane()
            drawDots(table)
        }

        function drawPane() {


            ctx.beginPath()
            //draw coordinate plate
            ctx.moveTo(width / 2, height / 2)
            ctx.lineTo(width, height / 2)

            ctx.moveTo(width / 2, height / 2)
            ctx.lineTo(0, height / 2)

            ctx.moveTo(width / 2, height / 2)
            ctx.lineTo(width / 2, height)

            ctx.moveTo(width / 2, height / 2)
            ctx.lineTo(width / 2, 0)
            //draw marks
            ctx.moveTo(width / 2 + rSize, height / 2 + markWidth)
            ctx.lineTo(width / 2 + rSize, height / 2 - markWidth)

            ctx.moveTo(width / 2 + rSize * 2, height / 2 + markWidth)
            ctx.lineTo(width / 2 + rSize * 2, height / 2 - markWidth)

            ctx.moveTo(width / 2 - rSize, height / 2 + markWidth)
            ctx.lineTo(width / 2 - rSize, height / 2 - markWidth)

            ctx.moveTo(width / 2 - rSize * 2, height / 2 + markWidth)
            ctx.lineTo(width / 2 - rSize * 2, height / 2 - markWidth)

            ctx.moveTo(width / 2 + markWidth, height / 2 + rSize)
            ctx.lineTo(width / 2 - markWidth, height / 2 + rSize)

            ctx.moveTo(width / 2 + markWidth, height / 2 + rSize * 2)
            ctx.lineTo(width / 2 - markWidth, height / 2 + rSize * 2)

            ctx.moveTo(width / 2 + markWidth, height / 2 - rSize)
            ctx.lineTo(width / 2 - markWidth, height / 2 - rSize)

            ctx.moveTo(width / 2 + markWidth, height / 2 - rSize * 2)
            ctx.lineTo(width / 2 - markWidth, height / 2 - rSize * 2)
            //draw arrows
            ctx.moveTo(width / 2, 0)
            ctx.lineTo(width / 2 + arrowSize, arrowSize)
            ctx.moveTo(width / 2, 0)
            ctx.lineTo(width / 2 - arrowSize, arrowSize)

            ctx.moveTo(width, height / 2)
            ctx.lineTo(width - arrowSize, height / 2 + arrowSize)
            ctx.moveTo(width, height / 2)
            ctx.lineTo(width - arrowSize, height / 2 - arrowSize)
            //draw text
            ctx.moveTo(width / 2, height / 2)
            ctx.font = '20px monospace'
            ctx.fillStyle = '#000'
            ctx.textAlign = 'center';

            ctx.fillText('-R/2', width / 2 - rSize, height * 8 / 17)
            ctx.fillText('-R', width / 2 - rSize * 2, height * 8 / 17)
            ctx.fillText('R/2', width / 2 + rSize, height * 8 / 17)
            ctx.fillText('R', width / 2 + rSize * 2, height * 8 / 17)
            ctx.textAlign = 'left'
            ctx.textBaseline = 'middle'
            ctx.fillText('-R/2', width * 9 / 17, width / 2 + rSize)
            ctx.fillText('-R', width * 9 / 17, width / 2 + rSize * 2)
            ctx.fillText('R/2', width * 9 / 17, width / 2 - rSize)
            ctx.fillText('R', width * 9 / 17, width / 2 - rSize * 2)

            ctx.font = '15px monospace'

            ctx.fillText('y', width * 9 / 17, arrowSize * 2)
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'

            ctx.fillText('x', width - arrowSize, height * 8 / 17)

            ctx.stroke()
            ctx.textAlign = 'center';

            ctx.font = '20px monospace'
            ctx.fillStyle = '#000'
        }

        function drawFigure() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.font = '20px monospace'
            ctx.fillStyle = '#000'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            ctx.beginPath()
            ctx.fillStyle = figureColor


            ctx.moveTo(width / 2, height / 2);
            ctx.lineTo(width / 2, height / 2 - rSize * 2);
            ctx.lineTo(width / 2 - rSize, height / 2);
            ctx.lineTo(width / 2 - rSize, height / 2 + rSize * 2);
            ctx.lineTo(width / 2, height / 2 + rSize * 2);
            ctx.lineTo(width / 2, height / 2);
            ctx.fill()

            ctx.moveTo(width / 2, height / 2);
            ctx.arc(width / 2, height / 2, rSize, 0, Math.PI / 2)
            ctx.fill()


        }

        function drawDots(table) {
            table.forEach(a => {
                    if (r == 0) r = 1;
                    let x = parseFloat(a['x'])
                    let y = parseFloat(a['y'])
                    r = parseFloat(r)
                    let realX = width / 2 + x / (r * 3 / 2) * width / 2
                    let realY = height / 2 - y / (r * 3 / 2) * height / 2
                    let hith = false
                    if (x >= 0 && (x*x + y * y < r * r / 4) && y <= 0) {
                        hith = true
                    }

                    if ((x <= 0) && (y >= 0) &&  (y <= r + 2.0*x)) {
                        hith = true
                    }

                    if (x <= 0 && y <= 0 && x >= -r/2 && y >= -r) {
                        hith = true
                    }


                    if (hith) ctx.fillStyle = '#0F0'
                    if (!hith) ctx.fillStyle = '#F00'

                    ctx.beginPath()
                    ctx.moveTo(realX, realY)
                    ctx.arc(realX, realY, 5, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.fillStyle = '#000'
                }
            )
        }


        canvas.onmousedown = (e) => {


            let xInp = document.getElementById('enter-x')
            let yInp = document.getElementById('enter-y')
            let rInp = document.getElementById('enter-r')
            let r = 5
            if (rInp.value == null || rInp.value === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'First enter R!',
                })

                return
            } else {
                r = rInp.value
            }

            let x = (e.offsetX / width) * (3 * r) - (3 / 2) * r;
            let y = ((3 * r / 2 - (e.offsetY / height * (3 * r))) * 10) / 10;
            sendAttempt(x, y, r, dispatch)


        }

        drawGraph()

    }, [dispatch, table, r])
    return (

        <div className="rainbow-box">
            <div className="card">
                <div id="graph-back"></div>
                <canvas id="graph" width="350" height="350">
                </canvas>
            </div>
        </div>

    )



}
//-1 means last page
export async function sendAttempt(x, y, r, dispatcher) {
    if (x == null || y == null || r == null || r == 0) {

        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'First enter values!',
        })
        return
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Bearer'),
        },
        body: JSON.stringify({
            login: localStorage.getItem('login'),
            x: x, y: y, r: r
        }),
    };

    //return amount of pages
    await fetch('http://localhost:8080/attempt', requestOptions)
        .then(async result => {
                if (await result.status === 200) {
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'you are not logged in:(',
                    })
                }
            }
        )
        .catch(e => {
            alert(e)
        })


    dispatcher(fetchDate(-1, 10))
}
export default Graph