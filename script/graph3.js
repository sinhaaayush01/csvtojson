// set the dimensions of the canvas
var margin = {top: 20, right: 20, bottom: 70, left: 80},
    width = 600 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
// add the SVG element
var svg2 = d3.select(".sec3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("script/ppp.json", function(error, data) {

    data.forEach(function(d) {
        d.Country = d.Country;
        d.PPP2013 = +d.PPP2013;
    });
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.PPP2013; })]);

  // add axis
  svg2.append('g')
   .attr('class', 'x axis')
   .attr('transform', `translate(0,${height})`)
   .call(xAxis)
   .selectAll('text')
   .style('text-anchor', 'end')
   .attr('dx', '-.8em')
   .attr('dy', '-.55em')
   .attr('transform', 'rotate(-80)');

 svg2.append('g')
   .attr('class', 'y axis')
   .call(yAxis)
   .append('text')
   .attr('transform', 'rotate(-90)')
   .attr('x', -height / 2)
   .attr('dy', '-5em')
   .style('text-anchor', 'middle')
   .text('PPP(Country)');


 // Add bar chart
 svg2.selectAll('bar')
   .data(data)
   .enter().append('rect')
   .attr('class', 'bar')
 // .transition().duration(3000)
   .attr('x', d => x(d.Country))
   .attr('width', x.rangeBand())
   .attr('y', d => y(d.PPP2013))
   .attr('height', d => height - y(d.PPP2013))
   .style('fill', (d, i) => `rgb(20, 20, ${(i * 30) + 100})`);
});