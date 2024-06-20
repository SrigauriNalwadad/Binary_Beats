// Example starter JavaScript for disabling form submissions if there are invalid fields
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Bootstrap form validation
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});



document.addEventListener('DOMContentLoaded', function () {
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

    // Handle Sign Up form submission
    document.querySelector('#signupModal form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Simulating account creation
        const form = event.target;
        if (form.checkValidity()) {
            const signUpModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
            signUpModal.hide();
            showSignInModal();

            // Pre-fill the Sign In form with the new user's email
            const email = document.getElementById('signupEmail').value;
            document.getElementById('signinModal').querySelector('#signinEmail').value = email;

            // Show a success message or alert
            alert('Account created successfully! Please sign in.');
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

