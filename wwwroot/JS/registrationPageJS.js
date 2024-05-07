document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, firstName, lastName, email })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = 'homePage.html'; // Redirect to homepage on success
            } else {
                response.text().then(text => alert(text)); // Display errors from server
            }
        })
        .catch(error => console.error('Error:', error));
});
