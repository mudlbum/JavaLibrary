// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Glide.js Carousel
const glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    gap: 30,
    autoplay: 4000,
    hoverpause: true,
    breakpoints: {
        1024: {
            perView: 2
        },
        600: {
            perView: 1
        }
    }
});
glide.mount();

// Initialize Leaflet Map
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add destination markers
const destinations = [
    { name: 'Santorini, Greece', lat: 36.3932, lng: 25.4615 },
    { name: 'Bali, Indonesia', lat: -8.3405, lng: 115.0920 },
    { name: 'Machu Picchu, Peru', lat: -13.1631, lng: -72.5450 },
    { name: 'Maldives', lat: 3.2028, lng: 73.2207 }
];

destinations.forEach(dest => {
    L.marker([dest.lat, dest.lng])
        .addTo(map)
        .bindPopup(`<strong>${dest.name}</strong><br>Click to explore!`)
        .openPopup();
});

// Animate Statistics with Anime.js
function animateStats() {
    const stats = [
        { element: '#happy-travelers', value: 15000 },
        { element: '#destinations', value: 150 },
        { element: '#years-experience', value: 12 },
        { element: '#awards', value: 25 }
    ];

    stats.forEach(stat => {
        anime({
            targets: stat.element,
            innerHTML: [0, stat.value],
            duration: 2000,
            delay: 500,
            easing: 'easeOutQuad',
            round: 1
        });
    });
}

// Trigger stats animation when section comes into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats')) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(document.querySelector('.stats'));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(74, 144, 226, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'linear-gradient(135deg, rgba(74, 144, 226, 0.95), rgba(80, 200, 120, 0.95))';
        header.style.boxShadow = 'none';
    }
});

// Lightbox configuration
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'albumLabel': 'Image %1 of %2'
});

// Add some interactive hover effects with Anime.js
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mousehover', () => {
        anime({
            targets: card,
            scale: 1.05,
            duration: 300,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
            autoplay: true
        });
    });
    card.addEventListener('mouseleave', () => {
        anime({
            targets: card,
            scale: 1,
            duration: 300,
            easing: 'easeInOutQuad'
        });
    });
});
// Initialize the lightbox for images
document.querySelectorAll('.lightbox-image').forEach(image => {
    image.addEventListener('click', (e) => {
        e.preventDefault();
        lightbox.start(e.target);
    });
});

// Initialize the contact form validation
document.querySelector('#contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const message = this.querySelector('textarea[name="message"]').value;
    if (name && email && message) {
        alert('Thank you for your message, ' + name + '! We will get back to you soon.');
        this.reset(); // Reset the form after submission
    } else {
        alert('Please fill in all fields before submitting.');
    }
});

// Initialize the testimonials slider
document.querySelectorAll('.testimonial').forEach((testimonial, index) => {
    testimonial.style.transform = `translateX(${index * 100}%)`;
});
// Function to show the next testimonial
function showNextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    const activeTestimonial = document.querySelector('.testimonial.active');
    let nextIndex = Array.from(testimonials).indexOf(activeTestimonial) + 1;
    if (nextIndex >= testimonials.length) {
        nextIndex = 0; // Loop back to the first testimonial
    }
    activeTestimonial.classList.remove('active');
    testimonials[nextIndex].classList.add('active');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.transform = `translateX(${(index - nextIndex) * 100}%)`;
    });
}

// Set an interval to automatically switch testimonials every 5 seconds
setInterval(showNextTestimonial, 5000);
// Initialize the FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.querySelector('.faq-content');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-content').style.maxHeight = null;
        });
        if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});