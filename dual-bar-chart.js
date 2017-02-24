var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;


var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
    y1 = d3.scale.linear().domain([20, 80]).range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0).ticks(4).orient("left");
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("frequencia.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.letra; }));
  y0.domain([0, d3.max(data, function(d) { return d.pt; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
	  .attr("class", "y axis axisLeft")
	  .attr("transform", "translate(0,0)")
	  .call(yAxisLeft)
	.append("text")
	  .attr("y", 6)
	  .attr("dy", "-2em")
	  .style("text-anchor", "end")
	  .style("text-anchor", "end")
	  .text("Frequência");



  // svg.append("g")
	//   .attr("class", "y axis axisRight")
	//   .attr("transform", "translate(" + (width) + ",0)")
	//   .call(yAxisRight)
	// .append("text")
	//   .attr("y", 6)
	//   .attr("dy", "-2em")
	//   .attr("dx", "2em")
	//   .style("text-anchor", "end")
	//   .text("#");
  //
  bars = svg.selectAll(".bar").data(data).enter();

  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.letra); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.frequencia); })
	  .attr("height", function(d,i,j) { return height - y0(d.frequencia); });
  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.letra); })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.pt); })
	  .attr("height", function(d,i,j) { return height - y1(d.pt); });


});
function type(d) {
  d.frequencia = +d.frequencia;
  return d;

}
