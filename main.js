document.addEventListener("DOMContentLoaded", () => {
    menuDisplay();
    displayUsername();
});

function menuDisplay() {
    if (!localStorage.getItem("username")) {
        document.getElementById("menu").style.display = "none";
    }
}

function login() {
    var username = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem("username", username); // stores the username to local storage
        window.location.href = "compare.html";
    } else {
        alert("Please enter both username and password");
    }
}

function displayUsername() {
    var username = localStorage.getItem("username");
    var displayElement = document.getElementById("username_display");
    displayElement.textContent = username;
}

function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}