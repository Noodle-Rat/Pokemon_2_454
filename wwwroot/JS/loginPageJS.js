document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the form from submitting through HTML form action

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        loginUser(username, password);
    });
});

function loginUser(username, password) {
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Handle login success, redirect or log in the user
                console.log('Login successful');
                window.location.href = 'homePage.html'; // Redirect to home page or dashboard
            } else {
                // Handle failed login
                alert('Incorrect username or password');
            }
        })
        .catch(error => {
            console.error('Login failed:', error);
            alert('Login failed, please try again later');
        });
}
