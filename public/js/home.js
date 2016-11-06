(function() {
	"use strict";
	var apiUrl = "http://localhost:3000/";
	var buyOrders, buyOrderBooks, sellOrders, sellOrderBooks;

	function setup() {

		getBuyOrders();
		getSellOrders();
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

		for(var i=0; i<sellOrders.length; i++) {
			var html = "<div><div><p>"+sellOrderBooks[i].title+"</p>";
			html+="<p>"+sellOrders[i].price+"</p></div>";
			// html += "<div><img src=" + sellData[i].image + "></img></div></div></br>";
			html += "<div><img src='./images/textbookcover.jpg'></div></div></br>"
			var searchdiv = document.getElementById('sell-search-div'); 
			// console.log(searchdiv);
			
			searchdiv.innerHTML += html;
		}
	}

	$(window).on('load', function () {
        //load in initial state
        setup();
    });

})();