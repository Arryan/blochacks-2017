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

	const txtFName = document.getElementById("first_name");
	const txtLName = document.getElementById("last_name");
	const txtPhone = document.getElementById("phone");
	const txtDob = document.getElementById("dob");
	const txtLocation = document.getElementById("location");
	const btnSignup = document.getElementById("signup");
	const error = document.getElementById("error");

	// Add login event
/*	btnLogin.addEventListener('click', e => {
		// Get email and pass
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// Sign In
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(e => error.innerText = "Sign in error: " + e.message);
	}); */

	btnSignup.addEventListener('click', e => {
		// Get email and pass
		// TODO: CHECK FOR REAL EMAILS
		const email = txtFName.value + "@mail.com";
		const pass = txtLName.value;
		const auth = firebase.auth();
		// Sign In
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => alert(e.message));

	});

	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		const fname = txtFName.value;
		const lname = txtLName.value;
		const phone = txtPhone.value;
		const dob = txtDob.value;
		const location = txtLocation.value;
		if(firebaseUser) {
			var db = firebase.database();
			db.ref('users/' + firebaseUser.uid).set({
				firstname: fname,
				lastname: lname,
				phonenumber: phone,
				birthdate: dob,
				camplocation: location
			});
			document.getElementById("signup-success").innerText = "Signed up successfuly"
		}
		else {
		}
	});

}());
