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

async function login() {
    loginOrCreate(`/api/auth/login`);
}
  
async function create() {
    loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
    const username = document.querySelector('#name')?.value;
    const password = document.querySelector('#password')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('username', username);
      window.location.href = 'jobEntry.html';
    } else {
      const body = await response.json();
      alert(body.msg);
    }
  }

function displayUsername() {
    let username = localStorage.getItem("username");
    let displayElement = document.getElementById("username_display");
    displayElement.textContent = username;
}

function logout() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, { method: 'delete' }).then(() => (window.location.href = '/'));
}

async function getUser(email) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
}