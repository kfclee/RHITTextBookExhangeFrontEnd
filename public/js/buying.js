(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    var books;
    var buyOrders;
    var buyers;

    function setup() {
        getBuyOrders();
        getBuyers();
        getBooks();
    }

    function getBooks() {
        $.ajax({
            url: apiUrl + "books",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    books = data;
                    displayBooks(books);
                } else {
                    console.log("Book info could not get got");
                }
            },
            error: function (req, status, err) {
                console.log(err, status, req);
            }
        })
    }

    function getBuyOrders() {
        $.ajax({
            url: apiUrl + "buyOrders",
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
        })
    }

    function getBuyers() {
        $.ajax({
            url: apiUrl + "users",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    buyers = data;
                } else {
                    console.log("User info could not get got");
                }
            },
            error: function (req, status, err) {
                console.log(err, status, req);
            }
        })
    }

    function displayBooks(booksToDisplay) {
        var listDiv = document.getElementById("book-list");
        console.log(booksToDisplay);
        booksToDisplay.forEach(function (book) {
            var bookDiv = listDiv.appendChild(document.createElement('div'));
            bookDiv.className = "book-div";

            var thisOrder;
            var thisBuyer;
            buyOrders.forEach(function (order) {
                if (order.textbook === book._id) {
                    thisOrder = order;
                    console.log("buy order found")
                    return;
                }
                return;
            })

            if (thisOrder) {
                var img = $('<img id="book-cover">');
                img.attr('src', 'images/textbookcover.jpg');
                img.appendTo(bookDiv);

                var title = $('<span />').html(book.title);
                title.addClass('book-info');
                title.addClass('book-title');
                title.appendTo(bookDiv);

                var price = $('<span />').html("$" + thisOrder.price);
                price.addClass('book-info');
                price.appendTo(bookDiv);

                buyers.forEach(function (buyer) {
                    if (thisOrder.buyer === buyer._id) {
                        thisBuyer = buyer;
                        console.log("buyer found");
                        return;
                    }
                    return;
                })

                
                img.click(function () {
                    bookClickHandler(book, thisOrder, thisBuyer);
                });
            }
        });
    }

    // save contact to update in browser storage and go to update page
    function bookClickHandler(book, order, buyer) {
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

        var bookToView = books.filter(bookWithID)[0];
        var orderToView = buyOrders.filter(orderWithID)[0];
        var buyerToView = buyers.filter(buyerWithID)[0];

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
    })

})();