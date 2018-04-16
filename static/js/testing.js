//Credits: http://charts.animateddata.co.uk/whatmakesushappy/js/main.js
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