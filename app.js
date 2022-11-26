// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYm49GRAWBDdVggiW9-8uwtP2TQ_PL6Ik",
    authDomain: "my-website-554ab.firebaseapp.com",
    databaseURL: "https://my-website-554ab.firebaseio.com",
    projectId: "my-website-554ab",
    storageBucket: "my-website-554ab.appspot.com",
    messagingSenderId: "260195947735",
    appId: "1:260195947735:web:53d0cf6c005fe505f2cc92",
    measurementId: "G-7QZ8YZLP7K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();


// Js Code...
var email = document.getElementById("email");
var password = document.getElementById("password");


window.login = function (e) {
    e.preventDefault()

    var obj = {
        email: email.value,
        password: password.value
    }

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            console.log(success.user.uid);
            window.location.replace('linked pages/home.html')
        })
        .catch(function (err) {
            console.log(err)
            alert("Incorrect Email or Incorrect Password")
        })

    console.log(obj);

    email.value = "";
    password.value = "";

}