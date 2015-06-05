/* need to add html
 * 
 <style>
 svg {
 overflow: visible;
 }
 </style>
 <svg>
 <circle></circle>
 <circle></circle>
 <circle></circle>
 <circle></circle>
 <circle></circle>
 </svg>
 */
var scale = 10;
d3
	.selectAll("circle")
	.data([10, 20, 30, 40, 50])
	.transition()
	.delay(function (d, i) { //delay to create
		return i * 100;
	})
	.duration(750) // time to transition
	.attr({
		stroke: "blue",
		fill: "red",
		r: function (d) {
			return Math.round(Math.sqrt(d * scale));
		}
	});
d3.selectAll("circle")
	.data([100, 200, 300, 400, 500])
	.attr("cx", function (d) {
		return d;
	})
	.attr("cy", function (d) {
		return d;
	});


