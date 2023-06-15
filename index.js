let health_data = './data/healthcare-dataset-stroke-data.json'
let req = new XMLHttpRequest()

let data
let values = []

let heightScale
let xScale
let xAxisScale
let yAxisScale

let width = 800
let height = 600
let padding = 40

let svg = d3.select('svg')

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let generateScales = () => {

    heightScale = d3.scaleLinear()
        .domain([0,d3.max(values, (item) => {
            return item[avg_glucose_level]
        })])
        .range([0, height - (2*padding)])
}

let drawBars = () => {

}

let generateAxes = () => {

}

req.open('GET', health_data, true)
req.onload = () => {
    data = JSON.parse(req.responseText)
    values = data
    console.log(values)
    drawCanvas()
    generateScales()
    drawBars()
    generateAxes
}
req.send()