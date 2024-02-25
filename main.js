document.addEventListener("DOMContentLoaded", () => {
    menuDisplay();
    displayUsername();
});

// Login Functionality

function menuDisplay() {
    if (!localStorage.getItem("username")) {
        document.getElementById("menu").style.display = "none";
    }
}

function login() {
    let username = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    

    if (username && password) {
        localStorage.setItem("username", username); // stores to local storage
        localStorage.setItem("password", password);
        if (!localStorage.getItem('previousEntries')) {
            window.location.href = "jobEntry.html";
        } else {
            window.location.href = "compare.html";
        }
    } else {
        alert("Please enter both username and password");
    }
}

function displayUsername() {
    let username = localStorage.getItem("username");
    let displayElement = document.getElementById("username_display");
    displayElement.textContent = username;
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}