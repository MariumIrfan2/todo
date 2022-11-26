// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
    getDatabase, ref,
    set,
    push,
    onChildAdded,
    remove
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const database = getDatabase();

var inpTodo = document.getElementById("inpTodo")
var parent = document.getElementById("parent")
var arr = []

var editId = arr.id;

function renderUL() {
    parent.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        parent.innerHTML += `<li>${arr[i].task}<br>
        <span class='label'>${arr[i].date}</span>
        <button class="remove" onclick="delTodo('${arr[i].id}')"><span><i class="fa-solid fa-xmark"></i></span> remove</button>
        <button  class="edit" onclick="editTodo('${arr[i].task}','${arr[i].id}')"><span><i class="fa-regular fa-pen-to-square"></i></span> Edit</button></li>`;
    }
}

var obj;
let taskrefrence;

window.sendData = function (e) {

    if (editId) {
        obj = {
            task: inpTodo.value,
            updateAt: JSON.stringify(new Date()),
            date: JSON.stringify(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`),
            id: editId
        }

        taskrefrence = ref(database, `TodoTasks/${editId}/`);

        set(taskrefrence, obj);

        editId = "";

        getData()
        renderUL()

    } else {
        obj = {

            task: inpTodo.value,
            date: JSON.stringify(`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`),
        }

        const keyRef = ref(database, "TodoTasks/");
        obj.id = push(keyRef).key
        console.log(obj.id)


        taskrefrence = ref(database, `TodoTasks/${obj.id}/`);

        console.log(arr)


    }

    set(taskrefrence, obj);

    inpTodo.value = "";

}


window.getData = function (e) {
    arr = [];
    const taskrefrence = ref(database, "TodoTasks/");
    onChildAdded(taskrefrence, function (data) {
        // console.log(data.val())
        arr.push(data.val())
        renderUL()
    })


}


window.logout = function () {
    signOut(auth)
        .then(function () {
            console.log("Logout Successfully");
            // window.location.href = "../index.html";
        })
        .catch(function (err) {
            console.log(err);
        });
};

function checkAuthentication() {
    onAuthStateChanged(auth, function (user) {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid);
            // ...
        } else {
            // User is signed out
            // ...
            window.location.href = "../index.html";
        }
    })


}

checkAuthentication();

window.delTodo = function (e) {

    console.log(e)
    const taskrefrence = ref(database, `TodoTasks/${e}/`);

    remove(taskrefrence).then(function (success) {
        getData()
        renderUL()
    })
        .catch(function (err) {
            console.log(err)

        })
}

window.editTodo = function (task, id) {

    console.log(task, id)

    inpTodo.value = task;
    editId = id;


}


