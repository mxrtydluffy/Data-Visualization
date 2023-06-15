const data = './fastfood.csv'

const width = 900;
const height = 400;

const margin = { top: 50, bottom: 50, left: 50, right: 50 }

// Displays SVG
const svg = d3.select('#d3-container')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.left -margin.right)
    .attr('viewBox', [0, 0, width, height]);

// X Axis
const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)

// Y Axis
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

// Creating boundaries
svg
    .append('g')
    .attr('fill', 'royalblue')
    .selectAll('rect')
    // Compare calories in descending order
    .data(data.sort((a, b) => d3.descending(a.calories, b.calories)))
    .join('rect')
        // Place in correct position
        .attr('x', (d, i) => x(i))
        .attr('y', (d) => y(d.score))
        .attr('height', d => y(0) - y(d.score))
        .attr('width', x.bandwidth())
        .attr('title', (d) => d.score)
        .attr("class", "rect")

function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data.format))
        .attr("font-size", '20px')
    }
    
    function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => data[i].name))
        .attr("font-size", '20px')
    }

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);
// Draw the boundaries
svg.node()