// Initialize Vanilla Tilt for 3D effects
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing animation for roles
const roles = document.querySelectorAll('.role');
let currentRole = 0;

function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 100);
    }
}

function startTypingAnimation() {
    roles.forEach(role => role.textContent = '');
    const text = roles[currentRole].getAttribute('data-text');
    typeWriter(roles[currentRole], text);
    currentRole = (currentRole + 1) % roles.length;
}

// Initialize roles text
roles.forEach(role => {
    role.setAttribute('data-text', role.textContent);
    role.textContent = '';
});

// Start typing animation
startTypingAnimation();
setInterval(startTypingAnimation, 4000);

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (contactForm.classList.contains('loading')) {
        return;
    }
    
    // Add loading state
    contactForm.classList.add('loading');
    contactForm.classList.remove('success', 'error');
    
    try {
        // Submit form using fetch
        const response = await fetch(contactForm.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: '1a7aa4c5-ff5f-4036-964b-7ca1ec3b908d',
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
                subject: 'New Contact Form Submission from Portfolio',
                from_name: 'Portfolio Contact Form',
                to_email: 'talarinithin0@gmail.com'
            })
        });

        const data = await response.json();

        // Remove loading state
        contactForm.classList.remove('loading');

        if (data.success) {
            // Show success message and reset form
            contactForm.classList.add('success');
            contactForm.reset();
            
            // Reset success state after 3 seconds
            setTimeout(() => {
                contactForm.classList.remove('success');
            }, 3000);
        } else {
            throw new Error('Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        
        contactForm.classList.remove('loading');
        contactForm.classList.add('error');
        
        
        setTimeout(() => {
            contactForm.classList.remove('error');
        }, 3000);
    }
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
    }
});


const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});


const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 