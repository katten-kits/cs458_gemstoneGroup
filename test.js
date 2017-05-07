d3.csv("gemstone.csv", function(error, data){
	if (error) throw error;

	console.log(data);

	// Mineral > gemstone > variety > (colors - these are the final objects)

	root = { "name": "gems", "children": [] };
	gemlist = root.children;
	data.forEach(function(gem){
		console.log(gem);
		if ( !gemlist.find(function(e){ return e.name == gem["Mineral"]; }) ){
			gemlist.push({ "name": gem["Mineral"], "children": [] });
		}
		mineral = gemlist.find(function(e){ return e.name == gem["Mineral"]; });

		if ( !mineral.find(function(e){ return e.name == gem["Gemstone"]; }) ){
			mineral.push({ "name": gem["Gemstone"], "children": [] });
		}
		gemstone = mineral.find(function(e){ return e.name == gem["Gemstone"]; });

		// if (!(gem["Variety"] in gemstone)){
		// 	gemstone[gem["Variety"]] = [];
		// }
		// variety = gemstone[gem["Variety"]];

		if ( !gemstone.find(function(e){ return e.name == gem["Variety"]; }) ){
			gemstone.push({ "name": gem["Variety"], "children": [] });
		}
		variety = gemstone.find(function(e){ return e.name == gem["Variety"]; });

		gem.name = gem["Variety"];
		variety.push(gem);
	});

	console.log(root);

	root = d3.hierarchy(root)
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