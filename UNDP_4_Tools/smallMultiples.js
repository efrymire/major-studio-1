
d3.csv("GII_and_gini.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    startingCircles()
    svg(data)
});

var tau = 2 * Math.PI;

var arcBackL = d3.arc()
    .innerRadius(150)
    .outerRadius(200)
    .startAngle(tau/2+0.01);
    
var arcBackR = d3.arc()
    .innerRadius(150)
    .outerRadius(200)
    .startAngle(0.01);

var arcValueL = d3.arc()
    .innerRadius(150)
    .outerRadius(200)
    .startAngle(tau/2+0.01);

var arcValueR = d3.arc()
    .innerRadius(150)
    .outerRadius(200)
    .startAngle(tau/2-0.01);

function startingCircles() {
            
    var svg = d3.select("svg").attr('alignment-baseline','middle'),
        width = svg.attr('width'),
        height = window.innerHeight-50,
        g = svg.append("g")
            .attr('class','start')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var backgroundL = g.append("path")
        .datum({endAngle: tau-(0.01)})
        .style("fill", "#f2f2f2")
        .attr("d", arcBackL)
        .attr('class','startL');
        
    var backgroundR = g.append("path")
        .datum({endAngle: (tau/2)-(0.01)})
        .style("fill", "#f2f2f2")
        .attr("d", arcBackR)
        .attr('class','startR');
        
    // BOTTOM BREAK POINT
    
    var foreground = g.append("path")
        .datum({endAngle: (tau/2)+.01})
        .style("fill", "white")
        .attr("d", arcValueL)
        .attr('class','arcGii');
        
    var foreground = g.append("path")
        .datum({endAngle: (tau/2)-.01})
        .style("fill", "white")
        .attr("d", arcValueR)
        .attr('class','arcGii');
        
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
        .selectAll('div').data(data).enter()
        .append('div')
        .attr('class','col-sm-2 listText')
        .style('width', '30%')
        .text( function(d) { 
            return d.Country; })
        .on('click', function(e,a,j){ 
            d3.selectAll('g').filter('.value').remove()
            d3.selectAll('text').filter('.value').remove()
            d3.selectAll('div').filter('.listText').style('color','black')
            display.apply(this, [e,a,j,data])
        ; })
};

function display(e,a,j,data) {

    d3.select(this)
        .style('color','red')
        .attr('data-attr',a)
    
    var svg = d3.select("svg").attr('alignment-baseline','middle'),
        width = svg.attr('width'),
        height = window.innerHeight-50,
        g = svg.append("g")
            .attr('class','value')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    // GII CIRCLE
        
    if (e.gii == '#N/A') { 
        
        g.append('text')
            .text(function(d) { return 'GII: no data available' })
            .style('text-anchor', 'middle')
            .style('fill','lightgrey')
            .attr("dy", "0em")
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
            .attr("d", arcValueL)
            .attr('class','arcGii');
            
        g.append('text')
            .text(function(d) { return 'GII: ' + e.giip; })
            .style('text-anchor', 'middle')
            .attr("dy", "0em")
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
    
    // GINI CIRCLE
        
    if (e.gini == '#N/A') { 
            
        g.append('text')
            .text(function(d) { return 'GINI: no data available' })
            .style('text-anchor', 'middle')
            .style('fill','lightgrey')
            .attr("dy", "2em")
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
            .attr("d", arcValueR)
            .attr('class','arcGini');
            
        g.append('text')
            .text(function(d) { return 'GINI: ' + e.gini; })
            .style('text-anchor', 'middle')
            .style('fill','red')
            .attr("dy", "2em")
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
    
    // TEXT DETAILS
    
    g.append('text')
        .text(function(d) { return e.Country; })
        .style('text-anchor', 'middle')
        .style('font-weight','bold')
        .attr("dy", "-2em")
        .attr('class','value');
}