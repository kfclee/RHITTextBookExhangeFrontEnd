(function() {
	"use strict";
	var apiUrl = "http://localhost:3000/";
	var books, currUser, buyOrders, sellOrders, books, currUserID;

	var isSellinghtml = " is selling:</p></div>";
	var isBuyinghtml = " is looking for:</p></div>";

	function setup() {

		getCurrentUser();
		getBuyOrders();
		getSellOrders();
		getBooks();
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
		for(var i=0; i<sellOrders.length; i++) {
			var thisBook, thisOrder;

			books.forEach(function (book) {
				if(sellOrders[i].textbook === book._id) {
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
		for(var i=0; i<buyOrders.length; i++) {
			var thisBook, thisOrder; 

			books.forEach(function (book) {
				if(buyOrders[i].textbook === book._id) {
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
		}


		var addNewButton = "<button class='newBook' href=''>+ Add New</button>";
		sellDiv.innerHTML += addNewButton;
		buyDiv.innerHTML += addNewButton;

	}

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

	$(window).on('load', function () {
        //load in initial state
        setup();
    });

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
    	// console.log(base64);
		var imgTag = document.getElementById("profilePic");
		imgTag.setAttribute("src", "data:image/png;base64," + base64);
	}, false);
	reader.readAsBinaryString(img);
}


//5817ff5bf083f3263065d756