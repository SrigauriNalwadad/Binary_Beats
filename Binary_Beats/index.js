document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Function to show the Sign Up modal
    function showSignUpModal() {
        const signUpModal = new bootstrap.Modal(document.getElementById('signupModal'));
        signUpModal.show();
    }

    // Function to show the Sign In modal
    function showSignInModal() {
        const signInModal = new bootstrap.Modal(document.getElementById('signinModal'));
        signInModal.show();
    }

    // Add event listener for the Create Account link in the Sign In modal
    document.querySelector('#signinModal .create-account-link').addEventListener('click', function (event) {
        event.preventDefault();
        const signInModal = bootstrap.Modal.getInstance(document.getElementById('signinModal'));
        signInModal.hide();
        showSignUpModal();
    });

    // Add event listener for the Sign In link in the Sign Up modal
    document.querySelector('#signupModal .signin-link').addEventListener('click', function (event) {
        event.preventDefault();
        const signUpModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        signUpModal.hide();
        showSignInModal();
    });

    var email;
    var password;
    // Handle Sign Up form submission
    document.querySelector('#signupModal form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const form = event.target;
    
        if (form.checkValidity()) {
            const formData = new FormData(form);
    
            // Replace with your actual API endpoint for user registration
            const apiUrl = 'http://localhost:5454/auth/signup';
    
            email = formData.get('email');
            password = formData.get('password');
    
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    email: formData.get('email'),
                    phoneNo: formData.get('phone'),
                    password: formData.get('password')
                }),
            })
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Assuming the API returns a JWT token upon successful registration
                    const jwtToken = data.jwt; // Adjust according to your API response
    
                    // Save the JWT token in localStorage
                    localStorage.removeItem("jwtToken")
                    localStorage.setItem('jwtToken', jwtToken);
    
                    // Hide sign-up modal and show sign-in modal
                    const signUpModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
                    signUpModal.hide();
                    showSignInModal();
    
                    // Optionally, you can clear the form fields after successful submission
                    form.reset();
    
                    // Show a success message or alert
                    alert('Account created successfully! Please sign in.');
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Handle error scenarios, e.g., display error message to user
                });
        } else {
            form.classList.add('was-validated');
        }
    });
    

    // Handle Sign In form submission
    document.querySelector('#signinModal form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Simulate form submission and authentication
        const form = event.target;
        if (form.checkValidity()) {

            const formData = new FormData(form);
            if(formData.get('email')!=email || formData.get('password')!=password){
                alert("Invalid credentials");
            }
            // Simulate successful sign-in (normally, you would validate credentials against your server)
            const signInModal = bootstrap.Modal.getInstance(document.getElementById('signinModal'));
            signInModal.hide();
            

            // Redirect to the home page after successful sign-in
            window.location.href = 'index.html';
        } else {
            form.classList.add('was-validated');
        }
    });

});
