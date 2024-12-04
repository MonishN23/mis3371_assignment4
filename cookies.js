// Helper function to get a cookie value by name
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("patientForm");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const restoreData = document.getElementById("restoreData");
    const clearData = document.getElementById("clearData");
    const welcomeMessage = document.getElementById("welcomeMessage");


function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

// Helper function to set a cookie with an expiration date
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Helper function to delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("formData")) || {};
    Object.keys(savedData).forEach(id => {
        const field = document.getElementById(id);
        if (field) field.value = savedData[id];
    });
}

// Update the welcome message based on the cookie
function updateWelcomeMessage() {
    const name = getCookie('firstName');
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (name) {
        welcomeMessage.textContent = `Welcome, ${name}!`;
    } else {
        welcomeMessage.textContent = 'Welcome, New User!';
    }
}

// Save user data (first name) and update the cookie
function saveUserData(event) {
    event.preventDefault(); // Prevent form submission
    const firstName = document.getElementById('firstName').value;
    if (firstName) {
        setCookie('firstName', firstName, 7); // Set cookie to expire in 7 days
        updateWelcomeMessage();
        alert('Your name has been saved!');
    }
}

// Reset user as new by clearing the cookie
function resetUser() {
    deleteCookie('firstName');
    updateWelcomeMessage();
    alert('You are now treated as a new user!');
}
function saveFormData() {
    const formData = {};
    Array.from(form.elements).forEach(field => {
        if (field.id) formData[field.id] = field.value;
    });
    localStorage.setItem("formData", JSON.stringify(formData));
}

// Clear localStorage and cookies
function clearAllData() {
    localStorage.removeItem("formData");
    setCookie("firstName", "", -1);
    form.reset();
    welcomeMessage.innerText = "Welcome, New User!";
}

// Check if user is returning
const firstName = getCookie("firstName");
if (firstName) {
    welcomeMessage.innerText = `Welcome back, ${firstName}!`;
    modal.style.display = "block";
}

// Event Listeners
form.addEventListener("input", saveFormData);

closeModal.addEventListener("click", () => modal.style.display = "none");

restoreData.addEventListener("click", () => {
    loadFormData();
    modal.style.display = "none";
});

clearData.addEventListener("click", () => {
    clearAllData();
    modal.style.display = "none";
});
});

// On page load, update the welcome message
document.addEventListener('DOMContentLoaded', updateWelcomeMessage);
