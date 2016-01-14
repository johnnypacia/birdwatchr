console.log("         _     ")
console.log("        <')_,/ ")
console.log("        (_==/  ")
console.log("birder  ='-    ")
console.log("we're hiring!  ")



$(document).ready(function(){

	$.ajax({
		url: '/sightings',
		method:  'GET',
		dataType: 'json'
	}).done(function(data){
		console.log(data);
		callback(data);
	});

	var source = $('#list-template').html();
	var template = Handlebars.compile(source);
	console.log(template);

});