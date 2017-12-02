d3.csv("gender_calculation_gini.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
    svg(data)
});

function svg(data) {
    
    var groups = d3.select('div.content')
        .selectAll('div')
        .data(data.sort(function(b, a){
            return b["gii_rep"]-a["gii_rep"];
            })).enter()
        .append('div')
            .attr('class', function(d) { return 'col-md-2 col-sm-3 circle ' + d.country })
            .attr('width','150')
            .attr('height','150')
        // .append('svg')
        //     .attr('width','100')
        //     .attr('height','140')
            // .on('mouseover', function() {
                // d3.select(this)
                    // .style('background-color','blue')
                    // .append(text)
                    // .text('test')
                    // .text(function(d) {return d.Country})
            // })
            
    var div = d3.selectAll("div.circle")
        divWidth = div.attr('width'),
        divHeight = div.attr('height')
        
    div.append('svg')
        .attr('width','150')
        .attr('height','150')
        // .attr('transform', 'translate(' + divWidth/2 + ',0)')
    
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

}

// GRAVEYARD

    // var svg = d3.select("svg").attr('alignment-baseline','middle'),
    //     width = svg.attr('width'),
    //     height = svg.attr('height'),
    //     g = svg.append("g")
    //         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
    // var female = g.append('circle')
    //     .attr('r',e.gini)
    //     .style('fill','black')
    //     // .attr('cx',10)
        
    // var male = g.append('circle')
    //     .attr('r',e.gii)
    //     .style('fill','black')
    //     // .attr('cx',100)
        
// }

// function svg(data) {
    
//     d3.select('div.content')
//         .selectAll('div')
//         .data(data)
//         .enter()
//         .append('div')
//         .attr('class', function(d) { return 'col-sm-2 circle ' + d.Country })
//         // .append('text')
//         // .text( function(d) { return d.Country; })
//         .append('svg')
//         .attr('width','100%')
//         .attr('height','100%')
//         .append('circle')
//         .attr( 'r', function(d) { return d.gii*100; })
//         .attr('transform', 'translate(50,50)')
//         // .attr('cx', 100)
//         // .attr('cy', 0)
//         // .attr('transform', function(d, i) {
//             // return 'translate(50,' + i*10 + ')' })
//         .attr('fill','black')
// }