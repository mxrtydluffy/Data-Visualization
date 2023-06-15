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
        'color' : '#000'
    });



    function mouseoverHandler(d){
        tooltip.transition().style('opacity', .8)
        tooltip.style({
            'left' : (d3.event.pageX + 10) + 'px',
            'top' : (d3.event.pageY + 15) + 'px'
        })
        .html('<p> Date: ' + d[0] + '</p>'
                + '<p> Billions: ' + d[1] + '</p>')

        d3.select(this)
            .style('opacity', .1);
    }

    function mouseoutHandler(d){
        tooltip.transition().style('opacity', 0)
        d3.select(this)
            .style('opacity', 1);
    }

    function mouseMoving(d){
        tooltip
            .style("top", (d3.event.pageY -10)+ "px")
            .style("left",(d3.event.pageX +10)+"px");
        d3.select(this)
            .style('opacity', 0.8);
    }

    const svg = d3.select("#barGraph")
        .append("svg")
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

    .on('mouseover', mouseoverHandler)
    .on('mouseovering', mouseMoving)
    .on('mouseover', mouseoutHandler)

        svg.append("g")
            .attr("transform", "translate(0, "+ height +")")
            .call(xAxis)
            .selectAll("text-anchor", "end")
            .attr("dx", "0.5em")
            .attr("dy", ".55em")
            .attr("y", 30)
            .attr("transform", "rotate(-45)")

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -85)
            .attr("dy", "0.8em")
            .style("text-anchor", "end")
            .text("Value(billions)")    

    svg.append("g")

}

d3.csv("./data/healthcare-dataset-stroke-data.csv", function(data){
    const dataset = data.data;
    DrawBar(dataset);
});