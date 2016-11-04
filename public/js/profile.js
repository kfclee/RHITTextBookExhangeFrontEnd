var firstNameNode = document.getElementById("firstNameInput");
var lastNameNode = document.getElementById("lastNameInput");
var imageNode = document.getElementById("imageInput");
var yearNode = document.getElementById("yearInput");
var majorNode = document.getElementById("majorInput");
var ratingNode = document.getElementById("ratingInput");
var isYourProfile = false;
var editProfileButton = document.getElementById("editProfile");
var profileData;
(function () {
	setup();
	profileData = [{
		image: "./images/user-blank.png",
		firstName: "John",
		lastName: "Doe",
		year: "Senior",
		major: "Computer Science",
		bought: 3,
		sold: 4,
		rating: 95
	}];

	selling = [{
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

	buying = [{
		image: './images/book.png',
		title: 'title3',
		price: 'price3'
	},
		{
			image: './images/book.png',
			title: 'title4',
			price: 'price4'
		}];

	for (var i = 0; i < profileData.length; i++) {
		var html = "<div id='img'><img src=" + profileData[i].image + "></img></div>";
		html += "<div id='details'><p>" + profileData[i].firstName + " " + profileData[i].lastName + "</p>";
		html += "<p>" + profileData[i].year + ", " + profileData[i].major + " major</p>";
		html += "<p>Bought: " + profileData[i].bought + " books</p>";
		html += "<p>Sold: " + profileData[i].sold + " books</p>";
		html += "<p>Rating: " + profileData[i].rating + "%</p>";
		html += "</div>";
		// console.log(searchdiv);
		var info = document.getElementById("info");

		info.innerHTML += html;
	}
	for (var i = 0; i < selling.length; i++) {
		var html = "<div><div><p>" + selling[i].title + "</p>";
		html += "<p>" + selling[i].price + "</p></div>";
		html += "<div><img src=" + selling[i].image + "></img></div></div></br>";
		var sellingdiv = document.getElementById('selling');

		sellingdiv.innerHTML += html;
	}
	for (var i = 0; i < buying.length; i++) {
		var html = "<div><div><p>" + buying[i].title + "</p>";
		html += "<p>" + buying[i].price + "</p></div>";
		html += "<div><img src=" + buying[i].image + "></img></div></div></br>";
		var buyingdiv = document.getElementById('buying');

		buyingdiv.innerHTML += html;
	}
})();

function setup() {
	console.log("in setup");
    editProfileButton.innerHTML = "Rate User";
    if (isYourProfile) {
        editProfileButton.innerHTML = "Edit Profile";
    }
}

function editProfile() {
    if (isYourProfile) {
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        var firstNameInput = document.createElement("textarea");
        firstNameInput.setAttribute("rows", "1");
        firstNameInput.setAttribute("cols", "30");
        firstNameInput.innerHTML = profileData[0].firstName;

        var lastNameInput = document.createElement("textarea");
        lastNameInput.setAttribute("rows", "1");
        lastNameInput.setAttribute("cols", "30");
        lastNameInput.innerHTML = profileData[0].lastName;

        var imageInput = document.createElement("textarea");
        imageInput.setAttribute("rows", "1");
        imageInput.setAttribute("cols", "30");
        imageInput.innerHTML = profileData[0].image;

        var yearInput = document.createElement("textarea");
        yearInput.setAttribute("rows", "1");
        yearInput.setAttribute("cols", "30");
        yearInput.innerHTML = profileData[0].year;

        var majorInput = document.createElement("textarea");
        majorInput.setAttribute("rows", "1");
        majorInput.setAttribute("cols", "30");
        majorInput.innerHTML = profileData[0].major;

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


