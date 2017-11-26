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
				console.log(data);
				txtWelcome.innerText = "Welcome, " + data.firstname;
				for(let key in data) {
					let heading = document.createElement("h5");
					let txt = document.createElement("p");
					heading.innerText = key;
					txt.innerText = data[key].update;
					document.getElementById("current-situation").append(heading);
					document.getElementById("current-situation").append(txt);
				}
				console.log(data)
			});

			uploadBtn.addEventListener('click', e => {
				let pic = uploadBtn.value;
			});

			updateAreaBtn.addEventListener('click', e => {	
				let currentTime = Date();
				firebase.database().ref('/users/' + userId + "/lifeupdates/" + currentTime).set({
						update: txtUpdateArea.value
				});
			});
		}
		else {
			document.location.href = "index.html";
		}
	});

}());
