(function() {
	profileData = [{
			image: "./images/user-blank.png",
			firstName: "John",
			lastName: "Doe",
			year: "Senior",
			major: "Computer Science",
			bought: 3,
			sold: 4,
			rating: 95
	}];

	selling = [{
			image: './images/book.png',
			title: 'title1',
			price: 'price1'
		},
		{
			image: './images/book.png',
			title: 'title2',
			price: 'price2'
	}];

	buying = [{
			image: './images/book.png',
			title: 'title3',
			price: 'price3'
		},
		{
			image: './images/book.png',
			title: 'title4',
			price: 'price4'
	}];

	for (var i = 0; i < profileData.length; i++){
		var html = "<div id='img'><img src=" + profileData[i].image + "></img></div>";
		html += "<div><p>" + profileData[i].firstName + " " + profileData[i].lastName + "</p>";
		html += "<p>" + profileData[i].year + ", " + profileData[i].major + " major</p>";
		html += "<p>Bought: " + profileData[i].bought + " books</p>";
		html += "<p>Sold: " + profileData[i].sold + " books</p>";
		html += "<p>Rating: " + profileData[i].rating + "%</p>";
		html += "</div>";
		// console.log(searchdiv);
		var info = document.getElementById("info");
		
		info.innerHTML += html;
	}
	for (var i = 0; i < selling.length; i++){

	}
	for (var i = 0; i < buying.length; i++){

	}
})();