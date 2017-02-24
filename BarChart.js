var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height/2, 0]);
    y2 = d3.scaleLinear().rangeRound([height/2, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("frequencia.csv", function(d) {
  d.frequencia = +d.frequencia;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letra; }));
  y.domain([0, d3.max(data, function(d) { return d.frequencia; })]);
  y2.domain([0, d3.max(data, function(d) { return d.frequencia; })]);


  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y2).ticks(10, "%"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10 - margin.left + height)
      .attr("x",0 - (height / 2))
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letra); })
      .attr("y", function(d) { return y(d.frequencia); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height/2 - y(d.frequencia); });

  g.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.letra); })
      .attr("y", height/2)
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height/2 - y2(d.frequencia); });
});
