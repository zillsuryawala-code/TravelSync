// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAReSe6qxfBKxZ3Os4MjGhMiRq48I6POGI",
    authDomain: "travels-e2ddb.firebaseapp.com",
    projectId: "travels-e2ddb",
    storageBucket: "travels-e2ddb.appspot.com",
    messagingSenderId: "803936830243",
    appId: "1:803936830243:web:f666fc96f9376707bb0296"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById('google-login-btn');
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        alert("Google Login Successful");
        console.log("User:", user);
        window.location.href = "h1.html"; // Redirect to the correct page
    })
    .catch((error) => {
        alert("Google login failed: " + error.message);
        console.error("Error:", error);
    });
});


// Add event listener to submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Login successful");
            window.location.href = "front page.html";
            console.log("User:", user);
        })
        .catch((error) => {
            alert("Something went wrong: " + error.message);
            console.error("Error:", error);
        });
});
