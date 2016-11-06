(function() {
	"use strict";
	var apiUrl = "http://localhost:3000/";
	var buyOrders, buyOrderBooks, sellOrders, sellOrderBooks, users;

	function setup() {

		getBuyOrders();
		getSellOrders();
		getUsers();
		setTimeout(function () {populateOrders()}, 260);
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

	function getUsers() {
		$.ajax({
            url: apiUrl + "users",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    users = data;
                } else {
                    console.log("User info could not get got");
                }
            },
            error: function (req, status, err) {
                console.log(err, status, req);
            }
        })
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

		var buyData = [{
			image: './images/book.png',
			title: 'book title',
			price: 'price'
		},
		{
			image: './images/book.png',
			title: 'another title',
			price: 'another price'
		}];

		var sellData = [{
			image: './images/book.png',
			title: 'book title',
			price: 'Sell price'
		},
		{
			image: './images/book.png',
			title: 'another title',
			price: 'another sell price'
		}];

		for(var i=0; i<buyOrders.length; i++) {
			var html = "<div><div><p>"+buyOrderBooks[i].title+"</p>";
			html+="<p>"+buyOrders[i].price+"</p></div>";
			// html += "<div><img src=" + buyOrderBooks[i].imagePath + "></img></div></div></br>";
			html += "<div><img src='./images/textbookcover.jpg'></div></div></br>"
			var searchdiv = document.getElementById('buy-search-div'); 
			// console.log(searchdiv);
			
			searchdiv.innerHTML += html;
		}


		var sellDiv = document.getElementById('sell-search-div');
		for(var i=0; i<sellOrders.length; i++) {
			var thisUser, thisBook, thisOrder;

			sellOrderBooks.forEach(function (sellOrderBook) {
				if(sellOrders[i].textbook === sellOrderBook._id) {
					thisOrder = sellOrders[i];
					thisBook = sellOrderBook;
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
			price.innerHTML = thisOrder.price;
			textDiv.appendChild(price);

			var imgDiv = bookDiv.appendChild(document.createElement('div'));
			var img = document.createElement('img');
			img.setAttribute('src', 'images/textbookcover.jpg');
			imgDiv.appendChild(img);

			users.forEach(function (user) {
				if (user._id === thisOrder.seller) {
					thisUser = user;
					return;
				}
				return;
			});

			// console.log(img, thisBook, thisOrder, thisUser);
			img.addEventListener("click", function () {
				bookClickHandler(thisBook, thisOrder, thisUser, true)
			}, false);
		}
	}

	function bookClickHandler(book, order, buyer, isSeller) {
        var error = false;
        function bookWithID(thisbook) {
            return thisbook._id === book._id;
        }

        function orderWithID(thisorder) {
            return thisorder._id === order._id;
        }

        function buyerWithID(thisbuyer) {
            return thisbuyer._id === buyer._id;
        }

        var bookToView, orderToView;
        if(isSeller) {
	        bookToView = sellOrderBooks.filter(bookWithID)[0];
	        orderToView = sellOrders.filter(orderWithID)[0];

        } else {
			bookToView = buyOrderBooks.filter(bookWithID)[0];
	        orderToView = buyOrders.filter(orderWithID)[0];
        }
        var buyerToView = users.filter(buyerWithID)[0];        	

        console.log(bookToView, orderToView, buyerToView);

        try {
            // serialize it into a string
            var bookToViewString = JSON.stringify(bookToView);
            sessionStorage.setItem("bookToView", bookToViewString);
            
            var orderToViewString = JSON.stringify(orderToView);
            sessionStorage.setItem("orderToView", orderToViewString);
            
            var buyerToViewString = JSON.stringify(buyerToView);
            sessionStorage.setItem("buyerToView", buyerToViewString);
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