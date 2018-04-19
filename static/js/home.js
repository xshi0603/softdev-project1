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

var currentSet = "GDP"



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
// set the xScale
var min = getMinVal( currentSet );
var max = getMaxVal( currentSet );
xScale = d3.scale.linear()
				 .domain( [ min - min/10, max + max/10 ] )
				 .range( [padding, w - padding] );

// the scale function for the y-axis
var yScale;
// set the yScale
var lifeExMin = getMinVal( "Average Life Expectancy" );
var lifeExMax = getMaxVal( "Average Life Expectancy" );
yScale = d3.scale.linear()
				 .domain( [ lifeExMin - lifeExMin/10, lifeExMax + lifeExMax/10 ] )
				 .range( [h - padding, padding] );



// sets the scale function for the x-axis given a particular dataset
var setXScale = function() {
	var min = getMinVal( currentSet );
	var max = getMaxVal( currentSet );
	xScale.domain( [ min - min/10, max + max/10 ] ) // the values we can enter, offset to prevent awkward ends
}


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



// --------------------------- DRAW POINTS ---------------------------

// set the initial points by adding the data and setting the attributes
svg.selectAll("circle")
	.data( csvdata )
	.enter()
	.append('circle')
	.attr('cx',function(d) {
		return xScale( d[currentSet] )
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



// --------------------------- TRANSITIONS ---------------------------

// changes the currently displayed dataset to newSet and does the transition
var changeSet = function( newSet ) {
	// set the new dataset
	currentSet = newSet;
	// sets the new scale
	setXScale();
	
	// transition the x axis
	svg.select(".xaxis")
            .transition()
			.duration(1500)
            .call(xAxis);

	// transition the points
	svg.selectAll("circle")
			.transition()
			.duration(1500)
			.attr("cx", function(o) {
				return xScale( o[currentSet] )
			});
}
