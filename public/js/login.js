$(document).ready(function() {
	const registryToken = "c8950f98-0c9c-485a-b0af-754208d11d08";

	$("#login-button").click(function(){
		Rosefire.signIn(registryToken, function(error, rosefireUser){
			if (error){
				console.log("Error communicating with Rosefire", error);
				return;
			}
			window.location.replace('/home.html?authorization=' + rosefireUser.token);
		})
        console.log("Button Clicked");
	});
});