
d3.csv("GII_and_gini.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    startingCircles()
    svg(data)
});

var tau = 2 * Math.PI;

var arcBack = d3.arc()
    .innerRadius(180)
    .outerRadius(190)
    .startAngle(0.01);

var arcGini = d3.arc()
    .innerRadius(180)
    .outerRadius(190)
    .startAngle(tau/2);
    
var arcGii = d3.arc()
    .innerRadius(210)
    .outerRadius(220)
    .startAngle(tau/2);

function startingCircles() {
            
    var svg = d3.select("svg").attr('alignment-baseline','middle'),
        width = svg.attr('width'),
        height = window.innerHeight-50,
        g = svg.append("g")
            .attr('class','start')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var background = g.append("path")
        .datum({endAngle: tau-(0.01)})
        .style("fill", "#f2f2f2")
        .attr("d", arcBack)
        .attr('class','start');
        
    g.append('text')
        .text(function(d) { return 'select a country to start' })
        .style('text-anchor', 'middle')
        .style('font-style','italic')
        .style('fill','lightgrey')
        .attr("dy", "0em")
        .attr('class','value');
}

function svg(data) {
    
    d3.select('div.list')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .attr('class','col-sm-12')
        .attr('class','listText')
        .style('width', '100%')
        .text( function(d) { return d.Country; })
        .on('click', function(e,a,j){ 
            d3.selectAll('div').filter('.list').style('color','black')
            d3.selectAll('g').filter('.value').remove()
            d3.selectAll('text').filter('.value').remove()
            d3.selectAll('div').filter('.listText').style('color','black')
            
            display.apply(this, [e,a,j,data])
        ; })
};

function display(e,a,j,data) {

    d3.select(this)
        // .style("background-color","#f2f2f2")
        .style('color','red')
        .attr('data-attr',a)

    var tau = 2 * Math.PI;

    var svg = d3.select("svg").attr('alignment-baseline','middle'),
        width = svg.attr('width'),
        height = window.innerHeight-50,
        g = svg.append("g")
            .attr('class','value')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
    // GINI CIRCLE
        
    if (e.gini == '#N/A') { 
            
        g.append('text')
            .text(function(d) { return 'GINI: no data available' })
            .style('text-anchor', 'middle')
            .style('fill','lightgrey')
            .attr("dy", "0em")
            .attr('class','value')            
            .on('mouseover', function() {
                d3.select('path.arcGini')
                    .style('fill','white')
            })
            .on('mouseout', function() {
                d3.select('path.arcGini')
                    .style('fill','red')
            });;
        
        d3.interval(function() {
            foreground.transition()
            .duration(750);
    });
        
    } else {
        
        var foreground = g.append("path")
            .datum({endAngle: (tau*(e.gini/100))/2})
            .style("fill", "red")
            .attr("d", arcGini)
            .attr('class','arcGini');
            
        g.append('text')
            .text(function(d) { return 'GINI: ' + e.gini; })
            .style('text-anchor', 'middle')
            .style('fill','red')
            .attr("dy", "0em")
            .attr('class','value')
            .on('mouseover', function() {
                d3.select('path.arcGini')
                    .style('fill','white')
            })
            .on('mouseout', function() {
                d3.select('path.arcGini')
                    .style('fill','red')
            });
        
    }
    
    // GII CIRCLE
        
    if (e.gii == '#N/A') { 
        
        g.append('text')
            .text(function(d) { return 'GII: no data available' })
            .style('text-anchor', 'middle')
            .style('fill','lightgrey')
            .attr("dy", "2em")
            .attr('class','value')
            .on('mouseover', function() {
                d3.select('path.arcGii')
                    .style('fill','white')
            })
            .on('mouseout', function() {
                d3.select('path.arcGii')
                    .style('fill','black')
            });
            
    } else {
        
        var foreground = g.append("path")
            .datum({endAngle: (tau-(tau*e.gii)/2)})
            .style("fill", "black")
            .attr("d", arcGini)
            .attr('class','arcGii');
            
        g.append('text')
            .text(function(d) { return 'GII: ' + e.giip; })
            .style('text-anchor', 'middle')
            .attr("dy", "2em")
            .attr('class','value')
            .on('mouseover', function() {
                d3.select('path.arcGii')
                    .style('fill','white')
            })
            .on('mouseout', function() {
                d3.select('path.arcGii')
                    .style('fill','black')
            });
    }
    
    // START POINT
    
    var foreground = g.append("path")
        .datum({endAngle: (tau/2) + .01})
        .style("fill", "white")
        .attr("d", arcGini)
        .attr('class','arcGii');
        
    var foreground = g.append("path")
        .datum({endAngle: (tau/2) - .01})
        .style("fill", "white")
        .attr("d", arcGini)
        .attr('class','arcGii');
    
    // TEXT DETAILS
    
    g.append('text')
        .text(function(d) { return e.Country; })
        .style('text-anchor', 'middle')
        .style('font-weight','bold')
        .attr("dy", "-2em")
        .attr('class','value');
}