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
var profile;
(function () {
	"use strict";
	setup();
	var selling = [{
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

	var buying = [{
		image: './images/book.png',
		title: 'title3',
		price: 'price3'
	},
		{
			image: './images/book.png',
			title: 'title4',
			price: 'price4'
		}];
	var apiUrl = "http://localhost:3000/";
	var books, currUser, buyOrders, buyOrderBooks, sellOrders, sellOrderBooks, currUserID;

	var isSellinghtml = " is selling:</p></div>";
	var isBuyinghtml = " is looking for:</p></div>";

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
	function setup() {

		getCurrentUser();
		getBuyOrders();
		getSellOrders();
		setTimeout(function () {populateOrders()}, 300);
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

		setTimeout(function() {populateBuyOrderBooks()}, 100);
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

        setTimeout(function () {populateSellOrderBooks()}, 100);
	}

	function populateBuyOrderBooks() {
		buyOrderBooks = [];
		for(var i = 0; i < buyOrders.length; i++) {
			$.ajax({
	            url: apiUrl + "books/" + buyOrders[i].textbook,
	            type: 'GET',
	            dataType: 'JSON',
	            success: function (data) {
	                if (data) {
	                    buyOrderBooks.push(data);
	                } else {
	                    console.log("Buy order books could not get got");
	                }
	            },
	            error: function (req, status, err) {
	                console.log(err, status, req);
	            }
        	});
		}
	}

	function populateSellOrderBooks() {
		sellOrderBooks = [];
		for(var i = 0; i < sellOrders.length; i++) {
			$.ajax({
	            url: apiUrl + "books/" + sellOrders[i].textbook,
	            type: 'GET',
	            dataType: 'JSON',
	            success: function (data) {
	                if (data) {
	                    sellOrderBooks.push(data);
	                } else {
	                    console.log("Sell order books could not get got");
	                }
	            },
	            error: function (req, status, err) {
	                console.log(err, status, req);
	            }
        	});
		}
	}

	function populateOrders() {
		// for (var i = 0; i < profileData.length; i++){
		var html = "<div id='img'><img id='profilePic' src=" + currUser.profilePicture + "></img></div>";
		html += "<div id='details'><p>" + currUser.firstName + " " + currUser.lastName + "</p>";
		html += "<p>" + currUser.year + ", " + currUser.major + " major</p>";
		html += "<p>Bought: " + currUser.buyHistory.length + " books</p>";
		html += "<p>Sold: " + currUser.sellHistory.length + " books</p>";
		html += "<p>Rating: " + currUser.rating + "/5</p>";
		html += "</div>";
		// console.log(searchdiv);
		isSellinghtml = "<div class='header'><p>" + currUser.firstName + isSellinghtml;
		isBuyinghtml = "<div class='header'><p>" + currUser.firstName + isBuyinghtml;
		var info = document.getElementById("info");
		
		info.innerHTML += html;
		// }

		var sellingdiv = document.getElementById('selling');
		sellingdiv.innerHTML += isSellinghtml;
		for (var i = 0; i < sellOrders.length; i++){
			// console.log("Seller: " + sellOrders[i].seller);
			// console.log("CurrUser: " + currUserID);
			if  (sellOrders[i].seller === currUserID) {
				for (var j  = 0; j < sellOrderBooks.length; j++) {
					if(sellOrders[i].textbook === sellOrderBooks[j]._id) {

						//IMPORTANT: When you figure whatever this equality issue is out, fix it in home.js as well. 

						console.log(typeof sellOrders[i].textbook + " " + sellOrders[i].textbook);
						console.log(typeof sellOrderBooks[i]._id + " " + sellOrderBooks[i]._id);
						console.log(sellOrders[i].textbook === sellOrderBooks[j]._id); //what the actual fuck, JS. Go home, you're drunk
						var html = "<div><div><p>"+sellOrderBooks[i].title+"</p>";
						html+="<p>"+sellOrders[i].price+"</p></div>";
						// html += "<div><img src=" + sellOrderBooks[i].imagePath + "></img></div></div></br>";
						html += "<div><img src='./images/textbookcover.jpg'></div></div></br>"

						sellingdiv.innerHTML += html;
					}
				}
				
			} else {
				continue;
			}
		}
		var buyingdiv = document.getElementById('buying');
		buyingdiv.innerHTML += isBuyinghtml;
		for (var i = 0; i < buyOrders.length; i++){
			if (buyOrders[i].buyer === currUserID) {
				var html = "<div><div><p>"+buyOrderBooks[i].title+"</p>";
				html+="<p>"+buyOrders[i].price+"</p></div>";
				// html += "<div><img src=" + buyOrderBooks[i].imagePath + "></img></div></div></br>";
				html += "<div><img src='./images/textbookcover.jpg'></div></div></br>"


				buyingdiv.innerHTML += html;
			} else {
				continue;
			}
		}


		var addNewButton = "<button class='newBook' href=''>+ Add New</button>";
		sellingdiv.innerHTML += addNewButton;
		buyingdiv.innerHTML += addNewButton;
>>>>>>> refs/remotes/origin/master
	}
})();

function setup() {
    editProfileButton.innerHTML = "Rate User";
    if (isYourProfile) {
        editProfileButton.innerHTML = "Edit Profile";
	}
	getProfiles();
	loadImage('images/user-blank.png');
}

<<<<<<< HEAD
function submit() {
	if (isYourProfile) {
        profile.firstName = firstNameInput.value;
		profile.lastName = lastNameInput.value;
		profile.year = year.value;
		profile.major = majorInput.value;
		profile.image = imageInput.value;
		saveProfile();
		loadImage(profile.image);
    } else {
=======

	$(window).on('load', function () {
        //load in initial state
        setup();
    });
>>>>>>> refs/remotes/origin/master

    }
	closeModal();
}

function editProfile() {
    if (isYourProfile) {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        firstNameInput.setAttribute("rows", "1");
        firstNameInput.setAttribute("cols", "30");
		console.log("profile is: ");
		console.log(profile);
        firstNameInput.innerHTML = profile.firstName;

        lastNameInput.setAttribute("rows", "1");
        lastNameInput.setAttribute("cols", "30");
        lastNameInput.innerHTML = profile.lastName;

        imageInput.setAttribute("rows", "1");
        imageInput.setAttribute("cols", "30");
        imageInput.innerHTML = profile.image;

        yearInput.setAttribute("rows", "1");
        yearInput.setAttribute("cols", "30");
        yearInput.innerHTML = profile.year;

        majorInput.setAttribute("rows", "1");
        majorInput.setAttribute("cols", "30");
        majorInput.innerHTML = profile.major;

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


var addNewButton = "<button class='newBook' href=''>+ Add New</button>";
var sellingdiv = document.getElementById("selling");
sellingdiv.innerHTML += addNewButton;
var buyingdiv = document.getElementById("buying");
buyingdiv.innerHTML += addNewButton;

function myFunction() {
	var elm = document.getElementById('myFile'),
		img = elm.files[0],
		fileName = img.name, // not path
		fileSize = img.size; // bytes

	// By Parsing File
	var reader = new FileReader(),
		binary, base64;
	reader.addEventListener('loadend', function () {
<<<<<<< HEAD
		binary = reader.result; // binary data (stored as string), unsafe for most actions
		base64 = btoa(binary); // base64 data, safer but takes up more memory
		// console.log(binary);
		console.log(base64);
=======
    	binary = reader.result; // binary data (stored as string), unsafe for most actions
    	base64 = btoa(binary); // base64 data, safer but takes up more memory
    	// console.log(binary);
    	// console.log(base64);
>>>>>>> refs/remotes/origin/master
		var imgTag = document.getElementById("profilePic");
		imgTag.setAttribute("src", "data:image/png;base64," + base64);
	}, false);
	reader.readAsBinaryString(img);
}

<<<<<<< HEAD
function profileClickHandler(profile) {
	var error = false;
	function profileWithID(thisProfile) {
		return thisProfile._id === profile._id;
	}

	var profileToView = books.filter(profileWithID)[0];

	try {
		// serialize it into a string
		var profileToViewString = JSON.stringify(profileToView);
		sessionStorage.setItem("profileToView", profileToViewString);
	} catch (e) {
		alert("Error when writing to Session Storage " + e);
		error = true;
	}
	if (!error) {
		window.location = "profile.html";
		return false;
	}
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
        profile = JSON.parse(profileToViewString);
    }
}

function loadProfileInfo() {
    var profileDiv = document.getElementById("info");
	nameText.textContent = profile.firstName + " " + profile.lastName;
	yearText.textContent = "Year is: " + profile.year;
	majorText.textContent = profile.major;
	soldText.textContent = "Sold: " + profile.sellHistory.length + " books";
	boughtText.textContent = "Bought: " + profile.buyHistory.length + " books";
}

function getProfiles() {
	$.ajax({
		url: apiUrl + "users/",
		type: 'GET',
		dataType: 'JSON',
		success: function (data) {
			if (data) {
				profile = data[0];
				loadProfileInfo();
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
        url: apiUrl + "users/" + profile._id,
        type: 'PUT',
        data: profile,
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
=======

//5817ff5bf083f3263065d756
>>>>>>> refs/remotes/origin/master
