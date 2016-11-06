(function() {
	"use strict";
	var apiUrl = "http://localhost:3000/";
	var books, currUser, buyOrders, buyOrderBooks, sellOrders, sellOrderBooks, currUserID;

	var isSellinghtml = " is selling:</p></div>";
	var isBuyinghtml = " is looking for:</p></div>";

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