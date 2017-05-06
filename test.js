d3.csv("gemstone.csv", function(error, data){
	if (error) throw error;

	console.log(data);

	// Mineral > gemstone > variety > (colors - these are the final objects)

	gemlist = {};
	data.forEach(function(gem){
		console.log(gem);
		if (!(gem["Mineral"] in gemlist)){
			gemlist[gem["Mineral"]] = [];
		}
		mineral = gemlist[gem["Mineral"]];

		if (!(gem["Gemstone"] in mineral)){
			mineral[gem["Gemstone"]] = [];
		}
		gemstone = mineral[gem["Gemstone"]];

		if (!(gem["Variety"] in gemstone)){
			gemstone[gem["Variety"]] = [];
		}
		variety = gemstone[gem["Variety"]];

		variety.push(gem);
	});

	console.log(gemlist);

	root = d3.hierarchy({"root": gemlist})
	  .sum(function(n){ return n["Mohs Hardness High"]; })
	  .sort(function(a, b){ return a["Mohs Hardness High"] - b["Mohs Hardness High"]; });

	console.log(root);

	// The data selection, above, is p good! but the stuff below is... experimental. lol

	w = 960;
	h = 960;

	d3.select("#canvas")
      .append("svg:svg")
      .attr('width', w)
      .attr('height', h);

    d3.select("svg")
      .selectAll("circle")
      .data(root)
      .enter().append("circle").text(function(n){return n["Variety"]});
});