"use strict";
var apiUrl = "http://localhost:3000/";
var book;
var user;
var order;
var buyOrSell;
var editForm = false;
var isYourBook = true;
var editBookButton = document.getElementById("editBook");
var userID = 1;

var title = document.getElementById("title");
var titleText = title.appendChild(document.createElement('p'));
var titleNode = document.getElementById("titleInput");
var titleInput = document.createElement("textarea");

var author = document.getElementById("author");
var authorText = author.appendChild(document.createElement('p'));
var authorsNode = document.getElementById("authorsInput");
var authorsInput = document.createElement("textarea");


var isbn = document.getElementById("isbn");
var isbnText = isbn.appendChild(document.createElement('p'));
var ISBNNode = document.getElementById("ISBNInput");
var ISBNInput = document.createElement("textarea");

var condition = document.getElementById("condition");
var conditionText = condition.appendChild(document.createElement('p'));
var conditionNode = document.getElementById("conditionInput");
var conditionInput = document.createElement("textarea");

var course = document.getElementById("course");
var courseText = course.appendChild(document.createElement('p'));
var courseNode = document.getElementById("courseInput");
var courseInput = document.createElement("textarea");

var subject = document.getElementById("subject");
var subjectText = subject.appendChild(document.createElement('p'));
var subjectNode = document.getElementById("subjectInput");
var subjectInput = document.createElement("textarea");

var price = document.getElementById("price");
var priceText = price.appendChild(document.createElement('p'));
var priceNode = document.getElementById("priceInput");
var priceInput = document.createElement("textarea");

var sellerComments = document.getElementById("seller-comments");
var commentsText = sellerComments.appendChild(document.createElement('p'));
var commentsNode = document.getElementById("commentsInput");
var commentsInput = document.createElement("textarea");

// Load book from browser session storage
function loadBook() {
    var error = false;
    var bookToViewString;
    var orderToViewString;
    var buyerToViewString;
    var buyOrSellString;
    try {
        bookToViewString = sessionStorage.getItem("bookToView");
        orderToViewString = sessionStorage.getItem("orderToView");
        buyerToViewString = sessionStorage.getItem("buyerToView");
        buyOrSellString = sessionStorage.getItem("buyOrSell");
    } catch (e) {
        alert("Error when reading from Session Storage " + e);
        error = true;
        window.location = "index.html";
        return false;
    }
    if (!error) {
        book = JSON.parse(bookToViewString);
        user = JSON.parse(buyerToViewString);
        order = JSON.parse(orderToViewString);
        buyOrSell = JSON.parse(buyOrSellString);
    }
}

function getBook() {
    $.ajax({
        url: apiUrl + "books/" + book._id,
        type: 'GET',
        data: book,
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                book = data;
            } else {
                console.log("Book info could not be updated");
            }
        },
        error: function (req, status, err) {
            console.log(err, status, req);
        }
    })
}

function saveBook() {
    $.ajax({
        url: apiUrl + "books/" + book._id,
        type: 'PUT',
        data: book,
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                loadBookInfo();
                return false;
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

function saveOrder() {
    if(buyOrSell == "buy"){
        var urlSecondPart = "buyOrders/";
    } else{
        urlSecondPart = "sellOrders/";
    }
    $.ajax({
        url: apiUrl + urlSecondPart + order._id,
        type: 'PUT',
        data: order,
        dataType: 'JSON',
        success: function (data) {
            if (data) {
                loadBookInfo();
                return false;
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

function loadImage() {
    var bookImage = document.getElementById("book-image");
    var image = bookImage.appendChild(document.createElement('img'));
    image.setAttribute('src', 'images/book_placeholder.jpg');
}

function loadBookInfo() {
    var bookDiv = document.getElementById("book-info");
    titleText.textContent = book.title;
    console.log("authors are: ");
    console.log(book);
    authorText.textContent = book.authors;
    isbnText.textContent = "ISBN: " + book.ISBN;
    conditionText.textContent = "Condition: " + order.condition;
    subjectText.textContent = "Subject: " + book.subject;
    courseText.textContent = "Class: " + book.course;
    priceText.textContent = "$" + order.price;
}

function loadBuyerInfo() {
    var sellerDiv = document.getElementById("seller-info");

    var sellerName = document.getElementById("seller-name");
    var sellerRating = document.getElementById("seller-rating");
    var email = document.getElementById("email");
    var followers = document.getElementById("followers");
    var date = document.getElementById("date");

    var sellerNameText = sellerName.appendChild(document.createElement('p'));
    sellerNameText.textContent = "Seller: " + user.firstName + " " + user.lastName;
    var sellerRatingText = sellerRating.appendChild(document.createElement('p'));
    sellerRatingText.textContent = "Rating : " + user.rating + "%";
    var emailText = email.appendChild(document.createElement('p'));
    emailText.textContent = "Send " + user.firstName + " an email!";

    var followersText = followers.appendChild(document.createElement('p'));
    followersText.textContent = "Current post followers: " + order.favoritedCount;
    var dateText = date.appendChild(document.createElement('p'));
    dateText.textContent = "Originally posted on: 10/20/2016";

    commentsText.textContent = "Seller Comments: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi odio tortor, tempor sed turpis vel, facilisis pellentesque nulla. Cras dapibus ligula eros, quis dictum purus semper finibus. Nulla non ligula sed elit aliquam sollicitudin aliquam a                                  nibh. Nam eget ante ut lacus commodo congue et sed lacus. Integer fermentum tristique lacinia. Ut vulputate posuere lorem, a consectetur mi eleifend lacinia. Suspendisse est urna, luctus rutrum lorem et, semper semper dui.";
}

function editBook() {
    if (isYourBook) {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        titleInput.setAttribute("rows", "1");
        titleInput.setAttribute("cols", "30");
        titleInput.innerHTML = book.title;

        authorsInput.setAttribute("rows", "1");
        authorsInput.setAttribute("cols", "30");
        authorsInput.innerHTML = book.authors;

        ISBNInput.setAttribute("rows", "1");
        ISBNInput.setAttribute("cols", "30");
        ISBNInput.innerHTML = book.ISBN;

        conditionInput.setAttribute("rows", "1");
        conditionInput.setAttribute("cols", "30");
        conditionInput.innerHTML = order.condition;

        courseInput.setAttribute("rows", "1");
        courseInput.setAttribute("cols", "30");
        courseInput.innerHTML = book.course;

        subjectInput.setAttribute("rows", "1");
        subjectInput.setAttribute("cols", "30");
        subjectInput.innerHTML = book.subject;

        priceInput.setAttribute("rows", "1");
        priceInput.setAttribute("cols", "30");
        priceInput.innerHTML = order.price;

        commentsInput.setAttribute("rows", "1");
        commentsInput.setAttribute("cols", "30");
        commentsInput.innerHTML = order.commentsText;




        titleNode.appendChild(titleInput);
        authorsNode.appendChild(authorsInput);
        ISBNNode.appendChild(ISBNInput);
        conditionNode.appendChild(conditionInput);
        courseNode.appendChild(courseInput);
        subjectNode.appendChild(subjectInput);
        priceNode.appendChild(priceInput);
        commentsNode.appendChild(commentsInput);


        modal.style.display = "block";
        span.onclick = function () {
            closeModal();

        }
        window.onclick = function (event) {
            if (event.target == modal) {
                closeModal();
            }
        }
    } else {
        var favorited = document.getElementById("favorited");
        if (editBookButton.innerHTML == "Favorite Book") {
            editBookButton.innerHTML = "Unfavorite Book";
            favorited.style.visibility = "visible";
        } else {
            editBookButton.innerHTML = "Favorite Book";
            favorited.style.visibility = "hidden";
        }
    }
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    authorsNode.removeChild(authorsNode.firstChild);
    ISBNNode.removeChild(ISBNNode.firstChild);
    conditionNode.removeChild(conditionNode.firstChild);
    courseNode.removeChild(courseNode.firstChild);
    subjectNode.removeChild(subjectNode.firstChild);
    priceNode.removeChild(priceNode.firstChild);
    titleNode.removeChild(titleNode.firstChild);
    commentsNode.removeChild(commentsNode.firstChild);
}

function submit() {
    closeModal();
    if (isYourBook) {
        book.title = titleInput.value;
        book.ISBN = ISBNInput.value;
        book.authors = authorsInput.value;
        book.subject = subjectInput.value;
        order.condition = conditionInput.value;
        book.course = courseInput.value;
        order.price = priceInput.value;
        console.log(book);
        saveBook();
        saveOrder();
    } else{

    }
}

$(document).ready(function () {
    //if (window.location.pathname.indexOf('editBookDetails') > -1) {
    editForm = true;
    loadBook();
    loadImage();
    setup();
    //}
});

function setup() {
    var bookDiv = document.getElementById("book-info");
    var sellerDiv = document.getElementById("seller-info");

    // if (editForm) {
    //     loadForms();
    // } else {
    //     loadImage();
    loadBookInfo();
    loadBuyerInfo();
    //}

    var favButton = document.getElementById("fav-button");
    var editBook = document.getElementById("editBook");
    editBook.addEventListener("click", editBook, false);
    editBookButton.innerHTML = "Favorite Book";
    if (isYourBook) {
        editBookButton.innerHTML = "Edit Book";
    }
}
