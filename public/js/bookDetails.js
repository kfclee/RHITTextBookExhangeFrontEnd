(function () {
    "use strict";
    var apiUrl = "localhost:3000/books";
    var book;
    var seller;
    var editForm = false;

    // Load book from browser session storage
    function loadBook() {
        var error = false;
        var bookToUpdateString;
        try {
            bookToViewString = sessionStorage.getItem("bookToView");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            book = JSON.parse(bookToViewString);
        }
    }

    function saveBook() {
        $.ajax({
            url: apiUrl + book._id,
            type: 'PUT',
            data: book,
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    //redirect to their profile?
                } else {
                    console.log("Book info could not be updated");
                }
            },
            error: function (req, status, err) {
                console.log(err, status, req);
            }
        });
        return;
    }

    function createBook() {
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: book,
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    //redirect to the page where they can't edit the info?
                } else {
                    console.log("Book could not be created");
                }
            },
            error: function (req, status, err) {
                console.log(err, status, req);
            }
        });
        return;
    }

    function deleteBook() {
        $.ajax({
            url: apiUrl + book._id,
            type: 'DELETE',
            data: book,
            dataType: 'JSON',
            success: function (data) {
                if (data) {
                    //redirect to their profile?
                } else {
                    console.log("Book could not be deleted");
                }
            },
            error: function (req, status, err) {
                console.log(err, status, req);
            }
        });
        return;
    }
        
    // Load seller from browser session storage
    function loadSeller() {
        var error = false;
        var sellerString;
        try {
            sellerString = sessionStorage.getItem("sellerToView");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            seller = JSON.parse(sellerString);
        }
    }

    function loadImage() {
        var bookImage = document.getElementById("book-image");
        var image = bookImage.appendChild(document.createElement('img'));
        image.setAttribute('src', '../images/book_placeholder.jpg');
    }

    function loadBookInfo() {
        var bookDiv = document.getElementById("book-info");
        var title = document.getElementById("title");
        var author = document.getElementById("author");
        var isbn = document.getElementById("isbn");
        var condition = document.getElementById("condition");
        var subject = document.getElementById("subject");
        var price = document.getElementById("price");    

        var titleText = title.appendChild(document.createElement('p'));
        titleText.textContent = book.title;
        var authorText = author.appendChild(document.createElement('p'));
        authorText.textContent = book.author;
        var isbnText = isbn.appendChild(document.createElement('p'));
        isbnText.textContent = book.isbn;
        var conditionText = condition.appendChild(document.createElement('p'));
        conditionText.textContent = book.condition;
        var subjectText = subject.appendChild(document.createElement('p'));
        subjectText.textContent = book.subject;
        var priceText = price.appendChild(document.createElement('p'));
        priceText.textContent = book.price;

    }

    function loadSellerInfo() {
        var sellerDiv = document.getElementById("seller-info");

        var sellerName = document.getElementById("seller-name");
        var sellerRating = document.getElementById("seller-rating");
        var email = document.getElementById("email");
        var followers = document.getElementById("followers");
        var date = document.getElementById("date");
        var sellerComments = document.getElementById("seller-comments");

        var sellerNameText = sellerName.appendChild(document.createElement('p'));
        sellerNameText.textContent = "Seller: John Doe";
        var sellerRatingText = sellerRating.appendChild(document.createElement('p'));
        sellerRatingText.textContent = "Rating : 95%";
        var emailText = email.appendChild(document.createElement('p'));
        emailText.textContent = "Send John and email!";

        var followersText = followers.appendChild(document.createElement('p'));
        followersText.textContent = "Current post followers: 6";
        var dateText = date.appendChild(document.createElement('p'));
        dateText.textContent = "Originally posted on: 10/20/2016";

        var commentsText = sellerComments.appendChild(document.createElement('p'));
        commentsText.textContent = "Seller Comments: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi odio tortor, tempor sed turpis vel, facilisis pellentesque nulla. Cras dapibus ligula eros, quis dictum purus semper finibus. Nulla non ligula sed elit aliquam sollicitudin aliquam a                                  nibh. Nam eget ante ut lacus commodo congue et sed lacus. Integer fermentum tristique lacinia. Ut vulputate posuere lorem, a consectetur mi eleifend lacinia. Suspendisse est urna, luctus rutrum lorem et, semper semper dui.";
    }

    function setup() {
        console.log("setting up");

        var bookDiv = document.getElementById("book-info");
        var sellerDiv = document.getElementById("seller-info");

        if (editForm) {
            loadForms();
        } else {
            loadImage();
            loadBookInfo();
            loadSellerInfo();
        }
        
        var favButton = document.getElementById("fav-button");
    }

    $(document).ready(function () {
        if (window.location.pathname.indexOf('editBookDetails') > -1) {
            editForm = true;
        }
        loadBook();
        loadSeller();
        setup();
    });
})();
