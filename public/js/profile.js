"use strict";
var nameDiv = document.getElementById("name");
var firstNameNode = document.getElementById("firstNameInput");
var nameText = nameDiv.appendChild(document.createElement('p'));
var firstNameInput = document.createElement("textarea");

var lastName = document.getElementById("lastName");
var lastNameNode = document.getElementById("lastNameInput");
var lastNameInput = document.createElement("textarea");

var year = document.getElementById("year");
var yearNode = document.getElementById("yearInput");
var yearText = year.appendChild(document.createElement('p'));
var yearInput = document.createElement("textarea");

var major = document.getElementById("major");
var majorNode = document.getElementById("majorInput");
var majorText = major.appendChild(document.createElement('p'));
var majorInput = document.createElement("textarea");

var sold = document.getElementById("sold");
var soldText = major.appendChild(document.createElement('p'));

var bought = document.getElementById("bought");
var boughtText = major.appendChild(document.createElement('p'));

var profileImage = document.getElementById("profile-image");
var image = profileImage.appendChild(document.createElement('img'));
var imageInput = document.createElement("textarea");
var imageNode = document.getElementById("imageInput");

var ratingNode = document.getElementById("ratingInput");
var isYourProfile = true;
var editProfileButton = document.getElementById("editProfile");

var apiUrl = "http://localhost:3000/";
var books, currUser, buyOrders, sellOrders, currUserID;

var isSellinghtml = " is selling:</p></div>";
var isBuyinghtml = " is looking for:</p></div>";

$(document).ready(function () {
	setup();



	var sellingdiv = document.getElementById('selling');
	sellingdiv.innerHTML += isSellinghtml;
	console.log(sellingdiv);
	for (var i = 0; i < selling.length; i++) {
		var html = "<div><div><p>" + selling[i].title + "</p>";
		html += "<p>" + selling[i].price + "</p></div>";
		html += "<div><img src=" + selling[i].image + "></img></div></div></br>";
		sellingdiv.innerHTML += html;
	}
	var buyingdiv = document.getElementById('buying');
	console.log(buyingdiv);
	buyingdiv.innerHTML += isBuyinghtml;
	for (var i = 0; i < buying.length; i++) {
		var html = "<div><div><p>" + buying[i].title + "</p>";
		html += "<p>" + buying[i].price + "</p></div>";
		html += "<div><img src=" + buying[i].image + "></img></div></div></br>";

		buyingdiv.innerHTML += html;

	}
});

function setup() {
	getCurrentUser();
	getBuyOrders();
	getSellOrders();
	getBooks();
	editProfileButton.innerHTML = "Rate User";
	if (isYourProfile) {
		editProfileButton.innerHTML = "Edit Profile";
	}
	setTimeout(function () { populateOrders() }, 300);
}

function getCurrentUser() {
	//hard-coded user selection for now
	$.ajax({
		url: apiUrl + "users/5817ff5bf083f3263065d756",
		type: 'GET',
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				currUser = data;
				currUserID = currUser._id;
				// console.log(currUser);
			} else {
				console.log("User info could not get got");
			}
		},
		error: function (req, status, err) {
			console.log(err, status, req);
		}
	})
}

function getBuyOrders() {
	$.ajax({
		url: apiUrl + "buyOrders/",
		type: 'GET',
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				buyOrders = data;
			} else {
				console.log("Buy order info could not get got");
			}
		},
		error: function (req, status, err) {
			console.log(err, status, req);
		}
	});
}

function getBooks() {
	$.ajax({
		url: apiUrl + "books/",
		type: 'GET',
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				books = data;
			} else {
				console.log("Buy order books could not get got");
			}
		},
		error: function (req, status, err) {
			console.log(err, status, req);
		}
	});
}

function getSellOrders() {
	$.ajax({
		url: apiUrl + "sellOrders/",
		type: 'GET',
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				sellOrders = data;
			} else {
				console.log("Sell order info could not get got");
			}
		},
		error: function (req, status, err) {
			console.log(err, status, req);
		}
	});
}



function populateOrders() {
	isSellinghtml = "<div class='header'><p>" + currUser.firstName + isSellinghtml;
	isBuyinghtml = "<div class='header'><p>" + currUser.firstName + isBuyinghtml;

	// var html = "<div id='img'><img id='profilePic' src=" + currUser.profilePicture + "></img></div>";
	var html = "<div id='img'><img id='profilePic' src='images/user-blank.png'></div>"
	html += "<div id='details'><p>" + currUser.firstName + " " + currUser.lastName + "</p>";
	html += "<p>" + currUser.year + ", " + currUser.major + " major</p>";
	html += "<p>Bought: " + currUser.buyHistory.length + " books</p>";
	html += "<p>Sold: " + currUser.sellHistory.length + " books</p>";
	html += "<p>Rating: " + currUser.rating + "/5</p>";
	html += "</div>";
	// console.log(searchdiv);
	var info = document.getElementById("info");

	info.innerHTML += html;

	var sellDiv = document.getElementById('selling');
	sellDiv.innerHTML += isSellinghtml;
	for (var i = 0; i < sellOrders.length; i++) {
		var thisBook, thisOrder;

		books.forEach(function (book) {
			if (sellOrders[i].textbook === book._id) {
				thisOrder = sellOrders[i];
				thisBook = book;
				return;
			}
			return;
		});


		var bookDiv = sellDiv.appendChild(document.createElement('div'));

		var textDiv = bookDiv.appendChild(document.createElement('div'));

		var title = document.createElement('p');
		title.innerHTML = thisBook.title;
		textDiv.appendChild(title);
		var price = document.createElement('p');
		price.innerHTML = "$" + thisOrder.price;
		textDiv.appendChild(price);

		var imgDiv = bookDiv.appendChild(document.createElement('div'));
		var img = document.createElement('img');
		img.setAttribute('src', 'images/textbookcover.jpg');
		img.setAttribute('id', 'sell-image' + i);
		imgDiv.appendChild(img);

		// users.forEach(function (user) {
		// 	if (user._id === thisOrder.seller) {
		// 		thisUser = user;
		// 		return;
		// 	}
		// 	return;
		// });

		console.log(img, thisBook, thisOrder, currUser);
		stupidClosures(img, thisBook, thisOrder, currUser);

	}

	// ----------------------------------------------------------------------------------------------


	var buyDiv = document.getElementById('buying');
	buyDiv.innerHTML += isBuyinghtml;
	for (var i = 0; i < buyOrders.length; i++) {
		var thisBook, thisOrder;

		books.forEach(function (book) {
			if (buyOrders[i].textbook === book._id) {
				thisOrder = buyOrders[i];
				thisBook = book;
				return;
			}
			return;
		});


		var bookDiv = buyDiv.appendChild(document.createElement('div'));

		var textDiv = bookDiv.appendChild(document.createElement('div'));

		var title = document.createElement('p');
		title.innerHTML = thisBook.title;
		textDiv.appendChild(title);
		var price = document.createElement('p');
		price.innerHTML = "$" + thisOrder.price;
		textDiv.appendChild(price);

		var imgDiv = bookDiv.appendChild(document.createElement('div'));
		var img = document.createElement('img');
		img.setAttribute('src', 'images/textbookcover.jpg');
		img.setAttribute('id', 'buy-image' + i);
		imgDiv.appendChild(img);

		// users.forEach(function (user) {
		// 	if (user._id === thisOrder.buyer) {
		// 		thisUser = user;
		// 		return;
		// 	}
		// 	return;
		// });

		console.log(img, thisBook, thisOrder, currUser);
		stupidClosures(img, thisBook, thisOrder, currUser);
		// }

	}

	var addNewButton = "<button class='newBook' href=''>+ Add New</button>";
	sellDiv.innerHTML += addNewButton;
	buyDiv.innerHTML += addNewButton;
	// function setup() {

	// }

	function stupidClosures(img, book, order, user) {
		img.addEventListener("click", function () {
			console.log(book, order, user);
			bookClickHandler(book, order, user)
		}, false);
	}

	function bookClickHandler(book, order, user) {
		var error = false;

		try {
			// serialize it into a string
			var bookToViewString = JSON.stringify(book);
			sessionStorage.setItem("bookToView", bookToViewString);

			var orderToViewString = JSON.stringify(order);
			sessionStorage.setItem("orderToView", orderToViewString);

			var userToViewString = JSON.stringify(user);
			sessionStorage.setItem("userToView", userToViewString);
		} catch (e) {
			alert("Error when writing to Session Storage " + e);
			error = true;
		}
		if (!error) {
			window.location = "bookDetails.html";
			return false;
		}
	}

}

function submit() {
	if (isYourProfile) {
		currUser.firstName = firstNameInput.value;
		currUser.lastName = lastNameInput.value;
		currUser.year = yearInput.value;
		currUser.major = majorInput.value;
		currUser.image = imageInput.value;
		saveProfile();
		loadImage(currUser.image);
	} else {

		$(window).on('load', function () {
			//load in initial state
			setup();
		});

	}
	closeModal();
}

function closeRatingModal() {
	console.log("closing modal");
	var modal = document.getElementById('ratingModal');
	modal.style.display = "none";
	ratingNode.removeChild(ratingNode.firstChild);
}

function closeModal() {
	var modal = document.getElementById('myModal');
	modal.style.display = "none";
	firstNameNode.removeChild(firstNameNode.firstChild);
	lastNameNode.removeChild(lastNameNode.firstChild);
	imageNode.removeChild(imageNode.firstChild);
	yearNode.removeChild(yearNode.firstChild);
	majorNode.removeChild(majorNode.firstChild);
}



// Load book from browser session storage
function loadProfile() {
	var error = false;
	var profileToViewString;
	try {
		profileToViewString = sessionStorage.getItem("profileToView");
	} catch (e) {
		alert("Error when reading from Session Storage " + e);
		error = true;
		window.location = "index.html";
		return false;
	}
	if (!error) {
		currUser = JSON.parse(profileToViewString);
	}
}

function loadProfileInfo() {
	var profileDiv = document.getElementById("info");
	nameText.textContent = currUser.firstName + " " + currUser.lastName;
	yearText.textContent = "Year is: " + currUser.year;
	majorText.textContent = currUser.major;
	soldText.textContent = "Sold: " + currUser.sellHistory.length + " books";
	boughtText.textContent = "Bought: " + currUser.buyHistory.length + " books";
}

function getProfiles() {
	$.ajax({
		url: apiUrl + "users/",
		type: 'GET',
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				currUser = data[0];
				loadProfileInfo();
				loadImage(currUser.image);
			} else {
				console.log("Book info could not get got");
			}
		},
		error: function (req, status, err) {
			console.log(err, status, req);
		}
	})
}

function saveProfile() {
	$.ajax({
		url: apiUrl + "users/" + currUser._id,
		type: 'PUT',
		data: currUser,
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				loadProfileInfo();
				return false;
			} else {
				console.log("Profile info could not be updated");
			}
		},
		error: function (req, status, err) {
			console.log(err, status, req);
		}
	});
	return;
}

function loadImage(imagePath) {
	image.setAttribute('src', imagePath);
}

function editProfile() {
	if (isYourProfile) {
		var modal = document.getElementById('myModal');
		var span = document.getElementsByClassName("close")[0];

		firstNameInput.setAttribute("rows", "1");
		firstNameInput.setAttribute("cols", "30");
		console.log("profile is: ");
		console.log(currUser);
		firstNameInput.innerHTML = currUser.firstName;

		lastNameInput.setAttribute("rows", "1");
		lastNameInput.setAttribute("cols", "30");
		lastNameInput.innerHTML = currUser.lastName;

		imageInput.setAttribute("rows", "1");
		imageInput.setAttribute("cols", "30");
		imageInput.innerHTML = currUser.image;

		yearInput.setAttribute("rows", "1");
		yearInput.setAttribute("cols", "30");
		yearInput.innerHTML = currUser.year;

		majorInput.setAttribute("rows", "1");
		majorInput.setAttribute("cols", "30");
		majorInput.innerHTML = currUser.major;

		firstNameNode.appendChild(firstNameInput);
		lastNameNode.appendChild(lastNameInput);
		imageNode.appendChild(imageInput);
		yearNode.appendChild(yearInput);
		majorNode.appendChild(majorInput);


		modal.style.display = "block";
		span.onclick = function () {
			closeModal();

		}
		window.onclick = function (event) {
			if (event.target == modal) {
				console.log("this is where i am");
				if (isYourProfile) {
					closeModal();
				} else {
					closeRatingModal();
				}
			}
		}
	} else {
		var modal = document.getElementById('ratingModal');
		var span = document.getElementsByClassName("close")[1];

		var ratingInput = document.createElement("textarea");
		ratingInput.setAttribute("rows", "1");
		ratingInput.setAttribute("cols", "30");
		ratingInput.innerHTML = "1";

		ratingNode.appendChild(ratingInput);

		modal.style.display = "block";
		span.onclick = function () {
			closeRatingModal();
		}
		window.onclick = function (event) {
			if (event.target == modal) {
				closeRatingModal();
			}
		}
	}
}