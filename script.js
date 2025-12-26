document.addEventListener('DOMContentLoaded', () => {
    // --- Light/Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        htmlElement.classList.add(currentTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.add('light');
    }

    themeToggle.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            htmlElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.classList.remove('light');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- Typewriter Effect ---
    const typewriterTextElement = document.getElementById('typewriter-text');
    const phrases = [
        "A Fintech Leader",
        "Driving Innovation & Growth",
        "Head of Growth & Insights"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds per character

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting
        } else {
            typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase, then start deleting
            typingSpeed = 1500; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 1000);

    // --- Scroll-Triggered Animations (Intersection Observer) ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

