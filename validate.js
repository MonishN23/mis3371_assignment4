// Update Date Banner on page load

//     const now = new Date();
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const day = days[now.getDay()];
//     const date = now.getDate();
//     const month = months[now.getMonth()];
//     const year = now.getFullYear();
//     document.getElementById('date-banner').innerHTML = `Today is: ${day}, ${month} ${date}, ${year}`;
// };

// Update salary display dynamically
document.getElementById('salary').addEventListener('input', function () {
    const salaryValue = this.value;
    document.getElementById('salaryDisplay').innerText = '$' + salaryValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

// Validates the password and confirm password fields
function validatePasswords() {
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("rePassword").value;

    if (password !== rePassword) {
        alert("Passwords do not match. Please re-enter.");
        hideReview();
        return false;
    }
    alert("Form submitted successfully!");
    return true;
}
// Event listener for the form submission
document.getElementById("patientForm").addEventListener("submit", function (event) {
    if (!validatePasswords()) {
        event.preventDefault(); // Prevent form submission if passwords don't match
    }
});

// Validate form fields
function validateField(id, validationFn, errorMsg) {
    const field = document.getElementById(id);
    const errorDisplay = document.getElementById(id + '-error');
    
    if (validationFn(field.value)) {
        errorDisplay.style.display = 'none';
        return true;
    } else {
        errorDisplay.style.display = 'block';
        errorDisplay.innerText = errorMsg;
        return false;
    }
}

// Validate all fields on submit
document.getElementById('patientForm').addEventListener('submit', function (e) {
    const fieldsToValidate = [
        {id: 'firstName', validationFn: (value) => /^[A-Za-z]+$/.test(value), errorMsg: 'First name should contain only letters.'},
        {id: 'lastName', validationFn: (value) => /^[A-Za-z]+$/.test(value), errorMsg: 'Last name should contain only letters.'},
        {id: 'dob', validationFn: (value) => /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([0-9]{4})$/.test(value), errorMsg: 'Date of Birth format should be MM/DD/YYYY.'},
        {id: 'ssn', validationFn: (value) => /^\d{3}-\d{2}-\d{4}$/.test(value), errorMsg: 'SSN should be in the format XXX-XX-XXXX.'},
        {id: 'zip', validationFn: (value) => /^\d{5}(-\d{4})?$/.test(value), errorMsg: 'Zip code should be in the format XXXXX or XXXXX-XXXX.'},
        {id: 'email', validationFn: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), errorMsg: 'Please enter a valid email address.'},
        {id: 'username', validationFn: (value) => value.length >= 3, errorMsg: 'Username must be at least 3 characters long.'},
        {id: 'password', validationFn: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value), errorMsg: 'Password must be at least 8 characters, containing at least one uppercase letter, one lowercase letter, and one number.'},
        {id: 'rePassword', validationFn: (value) => value === document.getElementById('password').value, errorMsg: 'Passwords do not match.'}
    ];

    
    
    let valid = true;
    fieldsToValidate.forEach(field => {
        if (!validateField(field.id, field.validationFn, field.errorMsg)) {
            valid = false;
        }
    });

    if (!valid) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
})


// Review form data before submission
document.getElementById('reviewButton').addEventListener('click', showReview);

function showReview() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const ssn = document.getElementById('ssn').value;
    const address1 = document.getElementById('address1').value;
    const address2 = document.getElementById('address2').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const diseases = Array.from(document.querySelectorAll('input[name="disease"]:checked')).map(cb => cb.value).join(', ') || 'None';
    const vaccinationStatus = document.querySelector('input[name="vaccinationStatus"]:checked')?.value || 'Not specified';
    const salary = document.getElementById('salary').value;
    const formattedSalary = '$' + salary.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const email = document.getElementById('email').value;
    const symptoms = document.getElementById('symptoms').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;

    

    // Populate the review section
    document.getElementById('reviewFirstName').innerText = firstName;
    document.getElementById('reviewLastName').innerText = lastName;
    document.getElementById('reviewDOB').innerText = dob;
    document.getElementById('reviewSSN').innerText = ssn;
    document.getElementById('reviewAddress1').innerText = address1;
    document.getElementById('reviewAddress2').innerText = address2;
    document.getElementById('reviewCity').innerText = city;
    document.getElementById('reviewState').innerText = state;
    document.getElementById('reviewZip').innerText = zip;
    document.getElementById('reviewDisease').innerText = diseases;
    document.getElementById('reviewVaccinationStatus').innerText = vaccinationStatus;
    document.getElementById('reviewSalary').innerText = formattedSalary;
    document.getElementById('reviewEmail').innerText = email;
    document.getElementById('reviewSymptoms').innerText = symptoms;
    document.getElementById('reviewUsername').innerText = username;

    document.getElementById('reviewSection').style.display = 'block';
}
function resetForm() {
    // Reset form fields
    document.getElementById("patientForm").reset();
    
    // Optionally, reset cookies if needed (use cookie management function here)
    // For example: clearCookie('firstName');
    
    // Reset dynamic elements (like review section)
    document.getElementById("reviewSection").style.display = "none";
    document.getElementById("newUserCheckbox").style.display = "none";
    
    // Reset welcome message or any personalized greetings
    document.getElementById("welcomeMessage").innerHTML = "Welcome New User";
    
    // Clear the cookie for "remember me" (if needed)
    document.getElementById("rememberMe").checked = true;
    
    // You can refresh the page to restart the state if necessary
    // window.location.reload(); // Uncomment this line if you want to reload the page
}


// Hide review section for edits
function hideReview() {
    document.getElementById('reviewSection').style.display = 'none';
}


