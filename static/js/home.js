// --------------------------- HANDLE DATA ---------------------------
// console.log( csvdata );

/*
	The variable csvdata is set by homepage.html and the flask app. It is an array
	of 50 objects, with each object representing a state and containing the relevant
	data for that state.
*/

// processes the data so that strings are appropriately converted to numerical values
var processData = function(){
	csvdata.forEach( function(o) {
		o["Average Life Expectancy"] = parseFloat( o["Average Life Expectancy"] );
		o["Obama Approval Rating"] = parseFloat( o["Obama Approval Rating"] );
		o["Unemployment Rate"] = parseFloat( o["Unemployment Rate"] );
		o["Wellbeing Index"] = parseFloat( o["Wellbeing Index"] );
		o["GDP"] = parseInt( o["GDP"] );
		o["Health Spending Per Capita"] = parseInt( o["Health Spending Per Capita"] );
	});
}

processData( csvdata );
console.log( csvdata );

var currentX = "GDP"


// --------------------------- SET INITIAL VARIABLES ---------------------------
var w = 700;
var h = 400;
var padding = 50;

var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],[410, 12], [475, 44], [25, 67], [85, 21], [220, 88] ];

var svg = d3.select("#graph")
	.append("svg")
	.attr("width", w)
	.attr("height", h);



// --------------------------- DRAW AXES ---------------------------

// helper method to get the minimum value for a particular dataset
var getMinVal = function( dataset ) {
	var currentMin = 10000000000000;
	csvdata.forEach( function(o) {
		if ( o[dataset] < currentMin ){
			currentMin = o[dataset];
		}
	});
	return currentMin;
}


// helper method to get the maximum value for a particular dataset
var getMaxVal = function( dataset ) {
	var currentMax = 0;
	csvdata.forEach( function(o) {
		if ( o[dataset] > currentMax ){
			currentMax = o[dataset];
		}
	});
	return currentMax;
}


// the scale function for the x-axis (set by setXScale)
var xScale;
// the scale function for the y-axis
var yScale;
// set the yScale permenantly
var lifeExMin = getMinVal( "Average Life Expectancy" );
var lifeExMax = getMaxVal( "Average Life Expectancy" );
yScale = d3.scale.linear()
				 .domain( [ lifeExMin - lifeExMin/10, lifeExMax + lifeExMax/10 ] )
				 .range( [h - padding, padding] );



// sets the scale function for the x-axis given a particular dataset
var setXScale = function() {
	var min = getMinVal( currentX );
	var max = getMaxVal( currentX );
	xScale = d3.scale.linear()
					 .domain( [ min - min/10, max + max/10 ] ) // the values we can enter, offset to prevent awkward ends
					 .range( [padding, w - padding] ); // the values to map to, set to the axis length
}

// set the initial xScale to GDP
setXScale();


// define the y axis
var yAxis = d3.svg.axis()
    .orient("left")
    .scale(yScale);

// define the y axis
var xAxis = d3.svg.axis()
    .orient("bottom")
    .scale(xScale);


// draw y axis with labels and move in from the size by the amount of padding
svg.append("g")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);

// draw x axis with labels and move to the bottom of the chart area
svg.append("g")
    .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);


// now rotate text on x axis
// solution based on idea here: https://groups.google.com/forum/?fromgroups#!topic/d3-js/heOBPQF3sAY
// first move the text left so no longer centered on the tick
// then rotate up to get 45 degrees.
svg.selectAll(".xaxis text")  // select all the text elements for the xaxis
    .attr("transform", function(d) {
	    return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
        });


// --------------------------- DRAW POINTS ---------------------------

svg.selectAll("circle")
	.data(csvdata)
	.enter()
	.append('circle')
	.attr('cx',function(d) {
		return xScale( d[currentX] )
	})
	.attr("cy", function(d) {
	 	return yScale( d["Average Life Expectancy"] )
	})
	.attr("r", 5)
	.on("mouseover", function(d) {
		return "" + d[0] + ", " + d[1]
		//visual info display
	})
	.on("mouseout", function(d) {
		//visual info display

	})
