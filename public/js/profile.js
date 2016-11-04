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

	var isSellinghtml = " is selling:</p></div>";
	var isBuyinghtml = " is looking for:</p></div>";

	for (var i = 0; i < profileData.length; i++){
		var html = "<div id='img'><img id='profilePic' src=" + profileData[i].image + "></img></div>";
		html += "<div id='details'><p>" + profileData[i].firstName + " " + profileData[i].lastName + "</p>";
		html += "<p>" + profileData[i].year + ", " + profileData[i].major + " major</p>";
		html += "<p>Bought: " + profileData[i].bought + " books</p>";
		html += "<p>Sold: " + profileData[i].sold + " books</p>";
		html += "<p>Rating: " + profileData[i].rating + "%</p>";
		html += "</div>";
		// console.log(searchdiv);
		isSellinghtml = "<div class='header'><p>" + profileData[i].firstName + isSellinghtml;
		isBuyinghtml = "<div class='header'><p>" + profileData[i].firstName + isBuyinghtml;
		var info = document.getElementById("info");
		console.log(info);
		
		info.innerHTML += html;
	}

	var sellingdiv = document.getElementById('selling');
	sellingdiv.innerHTML += isSellinghtml;
	console.log(sellingdiv);
	for (var i = 0; i < selling.length; i++){
		var html = "<div><div><p>"+selling[i].title+"</p>";
		html+="<p>"+selling[i].price+"</p></div>";
		html += "<div><img src=" + selling[i].image + "></img></div></div></br>";

		sellingdiv.innerHTML += html;
	}
	var buyingdiv = document.getElementById('buying');
	console.log(buyingdiv);
	buyingdiv.innerHTML += isBuyinghtml;
	for (var i = 0; i < buying.length; i++){
		var html = "<div><div><p>"+buying[i].title+"</p>";
		html+="<p>"+buying[i].price+"</p></div>";
		html += "<div><img src=" + buying[i].image + "></img></div></div></br>";

		buyingdiv.innerHTML += html;
	}


	var addNewButton = "<button class='newBook' href=''>+ Add New</button>";
	sellingdiv.innerHTML += addNewButton;
	buyingdiv.innerHTML += addNewButton;


})();

function myFunction() {
	var elm = document.getElementById('myFile'),
    img = elm.files[0],
    fileName = img.name, // not path
    fileSize = img.size; // bytes
    console.log(img);
    console.log(fileName);
    console.log(fileSize);

// By Parsing File
	var reader = new FileReader(),
    binary, base64;
	reader.addEventListener('loadend', function () {
    	binary = reader.result; // binary data (stored as string), unsafe for most actions
    	base64 = btoa(binary); // base64 data, safer but takes up more memory
    	// console.log(binary);
    	console.log(base64);
		var imgTag = document.getElementById("profilePic");
		imgTag.setAttribute("src", "data:image/png;base64," + base64);
	}, false);
	reader.readAsBinaryString(img);
}