document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        // Toggle Nav
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(38, 35, 31, 0.95)';
            navLinks.style.padding = '24px';
            navLinks.style.backdropFilter = 'blur(10px)';
        }

        // Simple animation switch (optional)
        menuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Reset on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.width = 'auto';
        } else {
            navLinks.style.display = 'none'; // logic could be better but sufficient for landing page
        }
    });
});
