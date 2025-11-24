const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/rudreshng045@gmail.com';

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.forEach((nav) => nav.classList.remove('active'));
        link.classList.add('active');
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
    });
});

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        formStatus.textContent = 'Sending...';

        const payload = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject.value,
            message: contactForm.message.value,
        };

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to send form');
            }

            formStatus.textContent = 'Thanks for reaching out! I will get back to you shortly.';
            contactForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.textContent = 'There was an issue sending your message. Please try again later.';
        }
    });
}


