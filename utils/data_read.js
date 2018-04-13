

/*
  csv: the file or pathname for the csv file you intend to load
  returns: an object with keys being states and values being the data
*/
var parseData = function( csv ) {
    d3.csv( csv, function(d) {
	return {
	    state : d["U.S. State"],
	    gdp : +d["Real GDP per Capita (2014)"]
	   };
   }, function(data) {
       console.log(data[0]);
   }
);
}


console.log("file loaded");
