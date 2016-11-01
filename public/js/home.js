(function() {
	buyData = [{
		image: './images/book.png',
		title: 'book title',
		price: 'price'
	},
	{
		image: './images/book.png',
		title: 'another title',
		price: 'another price'
	}];

	sellData = [{
		image: './images/book.png',
		title: 'book title',
		price: 'Sell price'
	},
	{
		image: './images/book.png',
		title: 'another title',
		price: 'another sell price'
	}];

	for(var i=0; i<buyData.length; i++) {
		var html = "<div><div><p>"+buyData[i].title+"</p>";
		html+="<p>"+buyData[i].price+"</p></div>";
		html += "<div><img src=" + buyData[i].image + "></img></div></div></br>";
		var searchdiv = document.getElementById('buy-search-div'); 
		// console.log(searchdiv);
		
		searchdiv.innerHTML += html;
	}

	for(var i=0; i<sellData.length; i++) {
		var html = "<div><div><p>"+sellData[i].title+"</p>";
		html+="<p>"+sellData[i].price+"</p></div>";
		html += "<div><img src=" + sellData[i].image + "></img></div></div></br>";
		var searchdiv = document.getElementById('sell-search-div'); 
		// console.log(searchdiv);
		
		searchdiv.innerHTML += html;
	}

})();