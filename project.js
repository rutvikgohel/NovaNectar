// Navigation menu functionality
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', event => {
        const target = event.target.getAttribute('href');
        if (target.startsWith('#')) {
            event.preventDefault();
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Show/hide password toggle
const passwordToggles = document.querySelectorAll('.toggle-password');
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
        const input = event.target.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            event.target.textContent = 'Hide';
        } else {
            input.type = 'password';
            event.target.textContent = 'Show';
        }
    });
});

// Search functionality
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = document.getElementById('search').value;
        alert(`Searching for: ${query}`);
    });
}

// Dynamic content for companies section
const companies = [
    { name: 'Google', logo: 'google-logo.png', link: '#' },
    { name: 'Apple', logo: 'apple-logo.png', link: '#' },
    { name: 'Microsoft', logo: 'microsoft-logo.png', link: '#' },
    { name: 'Amazon', logo: 'amazon-logo.png', link: '#' }
];

const companyContainer = document.querySelector('.company-logos');
if (companyContainer) {
    companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.classList.add('company-card');
        companyCard.innerHTML = `
            <img src="${company.logo}" alt="${company.name} Logo">
            <p>${company.name}</p>
            <a href="${company.link}">Visit</a>
        `;
        companyContainer.appendChild(companyCard);
    });
}

// Smooth scrolling to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Smooth navigation for all links
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (event) => {
        const target = link.getAttribute('href');

        // Check if the link is an internal page link (e.g., index.html, jobs.html)
        if (target.endsWith('.html')) {
            event.preventDefault(); // Prevent default anchor behavior
            window.location.href = target; // Redirect to the target page
        }
    });
});


// Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC419tjBuNtPb9B0TpFop3G06SBNyImM7A",
  authDomain: "job-portal-b8501.firebaseapp.com",
  projectId: "job-portal-b8501",
  storageBucket: "job-portal-b8501.firebasestorage.app",
  messagingSenderId: "653934987127",
  appId: "1:653934987127:web:5840fac1edbe5dbdf6c372",
  measurementId: "G-27GXFJXQP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Login functionality
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm['email'].value;
        const password = loginForm['password'].value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert('Login successful!');
                window.location.href = 'project.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
}

// Signup functionality
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = registerForm['name'].value;
        const email = registerForm['email'].value;
        const password = registerForm['password'].value;
        const mobile = registerForm['mobile'].value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return db.collection('users').doc(user.uid).set({
                    name: name,
                    email: email,
                    mobile: mobile
                });
            })
            .then(() => {
                alert('Signup successful!');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                alert('Error: ' + error.message);
            });
    });
}

// Load job listings
const jobList = document.getElementById('job-list');
if (jobList) {
    db.collection('jobs').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const job = doc.data();
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.company}</p>
                <p>${job.location}</p>
                <a href="${job.link}">Apply Now</a>
            `;
            jobList.appendChild(jobCard);
        });
    });
}



// Add 'active' class to the current page's navigation link
const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename
document.querySelectorAll('.navbar ul li a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Function to redirect to the main page
function redirectToHome() {
    window.location.href = "project.html"; // Redirect to the main page
}

// Add event listeners to the logo and home link
document.getElementById('logo').addEventListener('click', redirectToHome);
document.getElementById('home-link').addEventListener('click', redirectToHome);


// Search Functionality
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            // Redirect to the jobs page with the search query as a URL parameter
            window.location.href = `jobs.html?search=${encodeURIComponent(query)}`;
        } else {
            alert('Please enter a search term.');
        }
    });

    // Allow pressing "Enter" to trigger the search
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
}

// Qualification Section Functionality
const qualificationList = document.getElementById('qualification-list');

if (qualificationList) {
    qualificationList.addEventListener('click', (event) => {
        const selectedQualification = event.target.getAttribute('data-qualification');
        if (selectedQualification) {
            // Display a message or simulate filtering
            alert(`You selected: ${selectedQualification.toUpperCase()}`);
            // You can add more logic here to filter jobs dynamically
        }
    });
}
