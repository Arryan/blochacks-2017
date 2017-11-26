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
	const uploadBtn = document.getElementById("upload-file");
	



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
			const uploadBtn = document.getElementById("upload-file");
			const txtUpdateArea = document.getElementById("update-area");
			const updateAreaBtn = document.getElementById("update-area-btn");
			const userId = firebaseUser.uid;
			let data = {};

			firebase.database().ref('/users/' + userId).once('value')
			.then(function(snapshot){
				let data = snapshot.val();
				txtWelcome.innerText = "Welcome, " + data.firstname;
			});

			firebase.database().ref('/users/' + userId + "/lifeupdates").once('value')
			.then(function(snapshot){
				let data = snapshot.val();
				for(let key in data) {
					let heading = document.createElement("h5");
					let txt = document.createElement("p");
					heading.innerText = key;
					txt.innerText = data[key].update;
					document.getElementById("current-situation").append(heading);
					document.getElementById("current-situation").append(txt);
				}
			});

			updateAreaBtn.addEventListener('click', e => {	
				let currentTime = Date();
				firebase.database().ref('/users/' + userId + "/lifeupdates/" + currentTime).set({
					update: txtUpdateArea.value
				});
				window.location = "home.html";
			});


			function getLocation() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(pos) {
						//console.log(pos);
						firebase.database().ref('/users/' + userId + "/camplocation/").set({
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude
						});
					});
				} else { 
					console.log("Geolocation is not supported by this browser.");
				}
			}
			getLocation();
		}
		else {
			document.location.href = "index.html";
		}
	});

}());
