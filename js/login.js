// Login functionality
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Default users (in production, this would be handled by a backend)
const defaultUsers = [
    {
        email: 'admin@quantummaghrib.ma',
        password: 'admin123',
        name: 'Yassine Alami',
        role: 'Directeur Opérations'
    },
    {
        email: 'user@quantummaghrib.ma',
        password: 'user123',
        name: 'Utilisateur Test',
        role: 'Gestionnaire'
    }
];

// Initialize users in localStorage if not exists
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23" stroke-width="2"></line>
        `;
    } else {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"></path>
            <circle cx="12" cy="12" r="3" stroke-width="2"></circle>
        `;
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// Check if user is already logged in
function checkAuth() {
    const session = localStorage.getItem('session');
    if (session) {
        window.location.href = 'dashboard.html';
    }
}

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Create session
        const session = {
            email: user.email,
            name: user.name,
            role: user.role,
            loginTime: new Date().toISOString()
        };
        
        if (remember) {
            // Store in localStorage (persists until logout)
            localStorage.setItem('session', JSON.stringify(session));
        } else {
            // Store in sessionStorage (cleared when browser closes)
            sessionStorage.setItem('session', JSON.stringify(session));
        }
        
        // Redirect to main page
        window.location.href = 'dashboard.html';
    } else {
        showError('Email ou mot de passe incorrect. Veuillez réessayer.');
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeUsers();
    checkAuth();
});

