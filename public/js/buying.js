(function () {
    "use strict";
    var apiUrl = "http://localhost:3000/books";
    var books;
    var Allbooks;

    function setup() {
        getBooks();
    }

    function getBooks() {
        $.ajax({
            url: apiUrl,
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

    function displayBooks(booksToDisplay) {
        var listDiv = document.getElementById("book-list");
        console.log(booksToDisplay);
        booksToDisplay.forEach(function (book) {
            var bookDiv = listDiv.appendChild(document.createElement('div'));
            bookDiv.className = "book-div";

            var img = $('<img id="book-cover">');
            img.attr('src', 'images/textbookcover.jpg');
            img.appendTo(bookDiv);

            var title = $('<span />').html(book.title);
            title.addClass('book-info');
            title.addClass('book-title');
            title.appendTo(bookDiv);

            var price = $('<span />').html('$67.89');
            price.addClass('book-info');
            price.appendTo(bookDiv);

            img.click(function () {
                bookClickHandler(book);
            });
        });

    }

    // save contact to update in browser storage and go to update page
    function bookClickHandler(book) {
        var error = false;
        function bookWithID(thisbook) {
            return thisbook._id === book._id;
        }
        var bookToUpdate = books.filter(bookWithID)[0];
        try {
            // serialize it into a string
            var bookToUpdateString = JSON.stringify(bookToUpdate);
            sessionStorage.setItem("bookToView", bookToUpdateString);
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