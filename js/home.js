(function() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBRBc5m_GyEgLyNSLYBQkXLlGIyGA0xyww",
		authDomain: "blochacks2017.firebaseapp.com",
		databaseURL: "https://blochacks2017.firebaseio.com",
		projectId: "blochacks2017",
		storageBucket: "blochacks2017.appspot.com",
		messagingSenderId: "295105768584"
	};
	firebase.initializeApp(config);

	const btnLogout = document.getElementById("logout");



	btnLogout.addEventListener('click', e => {
		firebase.auth().signOut()
		.then(function() {
			document.location.href = "index.html";
		}).catch(function(error) {
		  // An error happened.
		  alert(error.message);
		});

});

	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			const txtWelcome = document.getElementById("welcome");
			const userId = firebaseUser.uid;
			let data;
			firebase.database().ref('/users/' + userId).once('value')
			.then(function(snapshot){
				let data = snapshot.val();
				txtWelcome.innerText = "Welcome, " + data.firstname;
			})

		}
		else {
			document.location.href = "index.html";
		}
	});

}());