document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Using fetch to submit the form data via POST to your server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '.../homePage.html';  // Redirect to the homepage
            } else {
                response.text().then(text => alert(text));  // Show error message from server
            }
        })
        .catch(error => console.error('Error:', error));
});
