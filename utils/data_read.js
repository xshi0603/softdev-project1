

/*
  csv: the file or pathname for the csv file you intend to load
  returns: an object with keys being states and values being the data
*/
var parseData = function( csv ) {
    obj = {};
    data = d3.csv( csv );
    for (var entry in data) {
	obj[ entry["state"] ] = entry["data"];
    }
    return obj;
}


console.log("file loaded");
