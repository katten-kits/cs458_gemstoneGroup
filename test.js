d3.json("sampleData.json", function(error, root) {
	if (error) throw error;

	root = d3.hierarchy(root);
	console.log(root);
});