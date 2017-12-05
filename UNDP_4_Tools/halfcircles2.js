
d3.csv("gender_calculation_gini.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    svg(data)
});

function svg(data) {
    
    var groups = d3.select('div.content')
        .selectAll('div')
        .data(data.filter(function(d){return d.region == 'Africa'}))
        .enter()
        .append('div')
            .attr('class', function(d) { return 'col-md-2 col-sm-3 circle ' + d.country })
            .attr('width','150')
            .attr('height','150')
            
    var div = d3.selectAll("div.circle")
        divWidth = div.attr('width'),
        divHeight = div.attr('height')
        
    div.append('svg')
        .attr('width','150')
        .attr('height','150')
        
    var svg = d3.selectAll("svg")
        svgWidth = svg.attr('width'),
        svgHeight = svg.attr('height')
        
    var tau = 2 * Math.PI;
        
    var gini = svg.append('path')
        .style("fill", "lightgrey")
        .attr('class', 'result')
        .attr("d", d3.arc()
            .innerRadius( 0 )
            .outerRadius( function(d) { return d.gini} )
            .startAngle(0)
            .endAngle(tau)
        )
        .attr('transform', 'translate(' + svgWidth/2 +  ',' + svgHeight/2 + ')')
        
    var female = svg.append('path')
        .style("fill", "red")
        .attr('class', 'result')
        .attr("d", d3.arc()
            .innerRadius(function(d) { return (d.female_index*50) - 4 })
            .outerRadius( function(d) { return d.female_index*50} )
            .startAngle(0)
            .endAngle(tau/2)
        )
        .attr('transform', 'translate(' + svgWidth/2 +  ',' + svgHeight/2 + ')')
    
    var male = svg.append('path')
        .style("fill", "black")
        .attr('class', 'result')
        .attr("d", d3.arc()
            .innerRadius( function(d) { return (d.male_index*50) - 4 })
            .outerRadius( function(d) { return (d.male_index*50)} )
            .startAngle(tau/2)
            .endAngle(tau)
        )
        .attr('transform', 'translate(' + svgWidth/2 +  ',' + svgHeight/2 + ')')
        
    var text = svg.append('text')
        .text(function(d) { return d.country} )
        .attr('width','100')
        .style('text-anchor', 'middle')
        .style('fill','black')
        .attr('transform', 'translate(' + svgWidth/2 +  ',20)')

    d3.select("#sortMale")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["male_index"]-b["male_index"];
        })})

    d3.select("#sortFemale")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["female_index"]-b["female_index"];
        })})
        
    d3.select("#sortGii")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["gii_rep"]-b["gii_rep"];
        })})

    d3.select("#sortGini")
		.on("click", function() {
			groups.sort(function(b, a){
            return a["gini"]-b["gini"];
        })})
    
//     d3.select("#filterAfrica")
// 		.on("click", function() {
// 		    groups.filter(function(d){return d.region == 'Africa'})
// 		})
		
// 	d3.select("#filterEurope")
// 		.on("click", function() {
// 		    groups.filter(function(d){return d.region == 'Europe'})
// 		})
    
//     d3.select("#filterAmericas")
// 		.on("click", function() {
// 		    groups.filter(function(d){return d.region == 'Americas'})
// 		})
		
// 	d3.select("#filterAsia")
// 		.on("click", function() {
// 		    var region = 'Asia'
// 		})
		
}

