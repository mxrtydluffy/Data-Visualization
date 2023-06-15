function DrawBar(dataset){
    const margin = {top: 50, right: 20, bottom: 50, left: 100}
    width = 800,
    height = 400

    // X & Y domain
    const minDate = dataset[0][0].substr(0,4);
        minDate = new Date(minDate);
    const maxDate = dataset[dataset.length-1][0].substr(0,4);
        maxDate = new Date(maxDate);

    const xAxis_scale = d3.time.scale()
        .domain([minDate, maxDate])
        .range([0, width]);

    const yAxis_scale = d3.time.linear()
        .domain([0, d3.max(dataset, function(d){
            return d[1];
        })
    ])
        .range([height, 0]);

    const xAxis = d3.svg.axis().scale(xAxis_scale).orient("bottom");
    const yAxis = d3.svg.axis().scale(yAxis_scale).orient("left");

    const tooltip = d3.select('body')('div').style({
        'position' : 'absolute',
        'padding' : '4px',
        'background' : '#fff',
        'border' : '1px solid #000',
    });

    const svg = d3.select("#barGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "graph-svg-component")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll("bar").data(dataset).enter().append("rect").style("fill", "orangered")
        .attr({
            x: function(d, i) { return ( i * (width/dataset.length)); },
                y: function(d) { return yAxis_scale(d[1]); },
                width: (width / dataset.length),
                height: function(d){ return height - yAxis_scale(d[1]); }
        })

}

d3.csv("/data/fastfood.csv", function(data){
    const dataset = data.data;
    DrawBar(dataset);
});