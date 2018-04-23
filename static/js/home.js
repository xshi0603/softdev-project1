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

var currentSet = "GDP";
    
// --------------------------- SET INITIAL VARIABLES ---------------------------
var w = 1200;
var h = 700;
var padding = 50;

var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],[410, 12], [475, 44], [25, 67], [85, 21], [220, 88] ];

var svg = d3.select("#graph")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

d3.select('svg')
    .append('line')
    .attr('id', 'bestfit');


d3.select('svg')
    .append('line')
    .attr('id', 'guide_lines');

d3.select('svg')
    .append('text')
    .attr('transform', 'translate(17, 350)rotate(-90)')
    .attr({'id': 'yL', 'text-anchor': 'middle'})
    .text('Life Expectancy(in years)');

d3.select('svg')
    .append('text')
    .attr({'id': 'xLabel', 'x': 600, 'y': 690, 'text-anchor': 'middle'})
    .text("State GDP(in $)");

var lobfeq = d3.select("#lobfeq");
var lobfreg = d3.select("#lobfreg");

var color = d3.scale.category20();



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
    .attr("r", 10)
    .attr("fill",function(d,i){return color(i);})

    .attr("state", function(d){
	return d["State"];
    })
    .attr("life", function(d){
	return d["Average Life Expectancy"];
    })
    .attr("approval", function(d){
	return d["Obama Approval Rating"];
    })
    .attr("unemploy", function(d){
	return d["Unemployment Rate"];
    })
    .attr("wellbeing", function(d){
	return d["Wellbeing Index"];
    })
    .attr("GDP", function(d){
	return d["GDP"];
    })
    .attr("health", function(d){
	return d["Health Spending Per Capita"];
    })
    .on("mouseover", function(d) {
	return "" + d[0] + ", " + d[1]
	//visual info display
    })
    .on("mouseout", function(d) {
	//visual info display
    })

// --------------------------- LINE OF BEST FIT-----------------------

var bestFit = function (xArray, yArray) {
    
    var sum = function (a, b) {
	return a + b;
    };

    var sumSquares = function (a, b) {
	return a * a + b * b;
    };

    var sumX = 0;

    for (var i = 0; i < xArray.length; i++) {

	sumX += xArray[i];

    }

    var sumY = 0;

    for (var i = 0; i < yArray.length; i++) {

	sumY += yArray[i];

    }

    var sumXSq = 0;
    for (var i = 0; i < xArray.length; i++) {

	sumXSq += (xArray[i] * xArray[i]) ;

    }

    var sumYSq = 0;

    for (var i = 0; i < yArray.length; i++) {

	sumYSq += (yArray[i] * yArray[i]) ;

    }

    var sumXY = 0;

    for (var i = 0; i < yArray.length; i++) {

	sumXY += (xArray[i] * yArray[i]) ;

    }

    var n = xArray.length;

    var ntor = ( ( sumXY ) - ( sumX * sumY / n) );
    var dtorX = sumXSq - ( sumX * sumX / n);
    var dtorY = sumYSq - ( sumY * sumY / n);
    
    var r = ntor / (Math.sqrt( dtorX * dtorY )); // Pearson ( http://www.stat.wmich.edu/s216/book/node122.html )
    var m = ntor / dtorX; // y = mx + b
    var b = ( sumY - m * sumX ) / n;
    
    
    console.log(r, m, b);
    return {r: r, m: m, b: b};
    
};



var drawLoBF = function (currentdata) {
    
    var x1 = xScale.domain()[0];
    var x2 = xScale.domain()[1];

    console.log(x1, x2);

    x1 += x1/30;
    x2 -= x2/30;

    console.log(x1, x2);

    var xArray = [];
    for (var i = 0; i < csvdata.length; i++) {
	xArray.push(csvdata[i][currentdata]);
    }

    var yArray = [];
    for (var i = 0; i < csvdata.length; i++) {
	yArray.push(csvdata[i]["Average Life Expectancy"]);
    }

    var coeff = bestFit(xArray, yArray);

    y1 = coeff.m * x1 + coeff.b;
    y2 = coeff.m * x2 + coeff.b;


    /*
    var img = body.append("img").attr("src", source).style("opacity", 0)
    img.transition().duration(5000).ease(d3.easeLinear).style("opacity", 1)
    */

    d3.select('#bestfit')
    .style("stroke", "rgb(255,0,0)")
    .style('opacity', 0)
    .style("stroke-width", 5)
    .style("stroke", "grey")
    .attr({'x1': xScale(x1), 'y1': yScale(y1), 'x2': xScale(x2), 'y2': yScale(y2)})
    .transition()
    .duration(1500)
    .style('opacity', 1);    

    /*
    d3.select('#bestfit')
    .attr({'x1': xScale(x1), 'y1': yScale(y1), 'x2': xScale(x2), 'y2': yScale(y2)})
    .attr({'stroke':'red'});
    */
    lobfeq.text(function (){
	    return "y = " + Number((coeff.m).toFixed(7)) + "x " + "+ " +  Number((coeff.b).toFixed(7));
	});

    lobfreg.text(function (){
	    return "r = " + Number((coeff.r).toFixed(7));
	});
    /*

    d3.select()
    
    var svgs = document.getElementsByTagName("svg")[0];
    lobf = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lobf.setAttribute("x1", xScale(min));
    lobf.setAttribute("x2", xScale(max));
    
    console.log(h - (xScale(min) * coeff["m"] + coeff["b"]));
    console.log(h - (xScale(max) * coeff["m"] + coeff["b"]));
    
    lobf.setAttribute("y1", h - (xScale(min) * coeff["m"] + coeff["b"]));
    lobf.setAttribute("y2", h - (xScale(max) * coeff["m"] + coeff["b"]));
    lobf.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:2");
    
    svgs.appendChild(lobf);
    */
};

drawLoBF(currentSet);


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
	
	// transition the lobf
	drawLoBF(currentSet);

	var title = document.getElementById("graph_title");
	title.innerHTML = "Life Expectancy vs. State " + currentSet;

	var xLabel = document.getElementById("xLabel");
	var label = "State " + currentSet + " (in ";
	if (currentSet == "GDP") {
	    label += "$)";
	}
	else if (currentSet == "Health Spending Per Capita") {
	    label += "$)";
	}
	else if (currentSet == "Obama Approval Rating") {
	    label += "%)";
	}
	else if (currentSet == "Unemployment Rate") {
	    label += "%)";
	}
	else if (currentSet == "Wellbeing Index") {
	    label += "idk)";
	}

	xLabel.innerHTML = label;
};

//var displayInfo = function(){
//var circles = svg.selectAll("circle");

// --------------------------- CHANGING ---------------------------
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var button5 = document.getElementById("button5");
var title = document.getElementById("graph_title");

button1.addEventListener("click", function() {
    changeSet("GDP");
    console.log("1");
    });

button2.addEventListener("click", function() {
    changeSet("Health Spending Per Capita");
    console.log("2");
    });

button3.addEventListener("click", function() {
    changeSet("Obama Approval Rating");
    console.log("3");
    });

button4.addEventListener("click", function() {
    changeSet("Unemployment Rate");
    console.log("4");
    });

button5.addEventListener("click", function() {
    changeSet("Wellbeing Index");
    console.log("5");
    });

// --------------------------- HOVERING ---------------------------
var displayData = function(circleData){
    var displayTitle = document.getElementById("displayInfoTitle");
    var display = document.getElementById("displayInfo");
    var state = circleData[0];
    var valueName = circleData[1];
    var value = circleData[2];
    var life = circleData[3];
    displayTitle.innerHTML = state;
    display.innerHTML = valueName + ": " + value + " | " + "Life Expectancy: "+life;     
}

var hoverDisplay = function(){

    //selects hover-overed element
    var circle = d3.select(this);

    circle.transition()
        .duration(800).style("opacity", 1)
        .attr("r", 16).ease("elastic");

    var state = circle.attr("State");

    var life = circle.attr("life");

    //displayData();
    console.log('hovered');
    
//working on this

    d3.select('#guide_lines')
    .attr('x1',circle.attr("cx"))
    .attr('x2', circle.attr('cx'))
    .attr('y1', circle.attr('cy'))
    .attr('y2', circle.attr('cy')+50)//testing
    .attr('transform', 'translate(0,' + (h - padding) + ')')
    .style("stroke", circle.style("fill"))
    .style('opacity', 0.2)
    .style("stroke-width", 1);

    d3.select()

}
    
var clearDisplay = function(){
    console.log('mouseoff');
}
    

//Adding event listeners for hovering
svg.selectAll("circle")
    .on("mouseover", hoverDisplay)
    .on("mouseout", clearDisplay);




        

		

