(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/";
    var books;
    var sellOrders;
    var sellers;

    function setup() {
        getSellOrders();
        getSellers();
        getBooks();
        getSortForms();
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

    function getSellOrders() {
        $.ajax({
            url: apiUrl + "sellOrders",
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
        })
    }

    function getSellers() {
        $.ajax({
            url: apiUrl + "users",
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    sellers = data;
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
        listDiv.innerHTML = "";
        console.log(booksToDisplay);
        sellOrders.forEach(function (order) {
            var thisOrder;
            var thisSeller;
            var thisBook;
            booksToDisplay.forEach(function (book) {
                if (order.textbook === book._id) {
                    thisOrder = order;
                    thisBook = book;
                    return;
                }
                return;
            })

            if (thisOrder) {
                var bookDiv = listDiv.appendChild(document.createElement('div'));
                bookDiv.className = "book-div";
                var img = $('<img id="book-cover">');
                img.attr('src', 'images/textbookcover.jpg');
                img.appendTo(bookDiv);

                var title = $('<span />').html(thisBook.title);
                title.addClass('book-info');
                title.addClass('book-title');
                title.appendTo(bookDiv);

                var price = $('<span />').html("$" + thisOrder.price);
                price.addClass('book-info');
                price.appendTo(bookDiv);

                sellers.forEach(function (seller) {
                    if (thisOrder.seller === seller._id) {
                        thisSeller = seller;
                        return;
                    }
                    return;
                })
                
                img.click(function () {
                    bookClickHandler(thisBook, thisOrder, thisSeller);
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
        var orderToView = sellOrders.filter(orderWithID)[0];
        var sellerToView = sellers.filter(buyerWithID)[0];

        try {
            // serialize it into a string
            var bookToViewString = JSON.stringify(bookToView);
            sessionStorage.setItem("bookToView", bookToViewString);
            
            var orderToViewString = JSON.stringify(orderToView);
            sessionStorage.setItem("orderToView", orderToViewString);
            
            var sellerToViewString = JSON.stringify(sellerToView);
            sessionStorage.setItem("buyerToView", sellerToViewString);
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        }
        if (!error) {
            window.location = "bookDetails.html";
            return false;
        }
    }

        function getSortForms() {
        var sortBySubject = document.getElementById("sort-subject");
        var sortByPrice = document.getElementById("sort-price");
        var findByIsbn = document.getElementById("sort-isbn");

        sortBySubject.addEventListener("change", function() {
            var subject = sortBySubject.value;
            filterBooksBySubject(subject);
        })

        sortByPrice.addEventListener("change", function() {
            var price = sortByPrice.value;
            filterBooksByPrice(price);
        })

    }

    function filterBooksBySubject(subject) {

    }

    function filterBooksByPrice(price) {
        if (price === "low") {
            sellOrders.sort(lowFirst);
        } else {
            sellOrders.sort(highFirst);
        }

        displayBooks(books);
    }

    function lowFirst(a, b) {
        if (a.price > b.price) {
            return 1;
        }
        if (a.price < b.price) {
            return -1;
        }
        return 0;
    }

    function highFirst(a, b) {
        if (a.price > b.price) {
            return -1;
        }
        if (a.price < b.price) {
            return 1;
        }
        return 0;
    }

    $(window).on('load', function () {
        //load in initial state
        setup();
    })

})();