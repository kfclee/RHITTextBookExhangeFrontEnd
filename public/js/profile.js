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
		},
		{
			image: './images/book.png',
			title: 'title3',
			price: 'price3'
		},
		{
			image: './images/book.png',
			title: 'title4',
			price: 'price4'
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
		html += "<div id='details'><p>" + profileData[i].firstName + " " + profileData[i].lastName + "</p>";
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
		var html = "<div><div><p>"+selling[i].title+"</p>";
		html+="<p>"+selling[i].price+"</p></div>";
		html += "<div><img src=" + selling[i].image + "></img></div></div></br>";
		var sellingdiv = document.getElementById('selling');

		sellingdiv.innerHTML += html;
	}
	for (var i = 0; i < buying.length; i++){
		var html = "<div><div><p>"+buying[i].title+"</p>";
		html+="<p>"+buying[i].price+"</p></div>";
		html += "<div><img src=" + buying[i].image + "></img></div></div></br>";
		var buyingdiv = document.getElementById('buying');

		buyingdiv.innerHTML += html;
	}
})();