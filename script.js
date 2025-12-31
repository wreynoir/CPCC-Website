document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Mobile Menu (existing functionality)
    // ============================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
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
            menuBtn.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navLinks.style.display = 'none';
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.backgroundColor = 'transparent';
                navLinks.style.padding = '0';
                navLinks.style.width = 'auto';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // ============================================
    // GSAP Animations
    // ============================================

    // Wait for GSAP to load
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded yet');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // 1. Hero Logo Reveal (Page Load)
    // ============================================
    const heroLogo = document.querySelector('.brand-logo img');
    if (heroLogo) {
        gsap.fromTo(heroLogo,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2
            }
        );
    }

    // ============================================
    // 2. Text Cascade (After Logo)
    // ============================================
    const subhead = document.querySelector('.hero .subhead');
    const heroButtons = document.querySelector('.hero-buttons');

    if (subhead) {
        gsap.fromTo(subhead,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.7
            }
        );
    }

    if (heroButtons) {
        gsap.fromTo(heroButtons,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.9
            }
        );
    }

    // ============================================
    // 3. Parallax Background (REMOVED - didn't look good on scroll up)
    // ============================================

    // ============================================
    // 4. Section Headers (Scroll Triggered)
    // ============================================
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const eyebrow = header.querySelector('.eyebrow');
        const h2 = header.querySelector('h2');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        if (eyebrow) {
            tl.fromTo(eyebrow,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
        if (h2) {
            tl.fromTo(h2,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                '-=0.3'
            );
        }
    });

    // ============================================
    // 5. Experience Cards (Staggered Reveal)
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        gsap.fromTo(featureCards,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#experience .service-cards',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ============================================
    // 6. Gallery Grid (Staggered Scale Reveal)
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        gsap.fromTo(galleryItems,
            { opacity: 0, scale: 0.85, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.gallery-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ============================================
    // 7. Membership Card (Elegant Entrance)
    // ============================================
    const membershipCard = document.querySelector('.membership-card');
    if (membershipCard) {
        gsap.fromTo(membershipCard,
            { opacity: 0, y: 50, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#membership',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ============================================
    // 8. Button Hover (Magnetic Effect)
    // ============================================
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.03,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Magnetic effect - button follows cursor slightly
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // ============================================
    // 9. Board Photos (Enhanced Hover)
    // ============================================
    const boardImages = document.querySelectorAll('.board-image');
    boardImages.forEach(imgContainer => {
        const img = imgContainer.querySelector('img');
        if (!img || imgContainer.classList.contains('placeholder')) return;

        imgContainer.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: 'grayscale(0%)',
                scale: 1.02,
                duration: 0.15,
                ease: 'power2.out'
            });
        });

        imgContainer.addEventListener('mouseleave', () => {
            gsap.to(img, {
                filter: 'grayscale(100%)',
                scale: 1,
                duration: 0.25,
                ease: 'power2.out'
            });
        });
    });

    // Board cards scroll reveal
    const boardCards = document.querySelectorAll('.board-card');
    if (boardCards.length > 0) {
        gsap.fromTo(boardCards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.12,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.board-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // ============================================
    // 10. Price Counter Animation
    // ============================================
    const priceAmount = document.querySelector('.amount');
    if (priceAmount) {
        const targetPrice = 50;
        let hasAnimated = false;

        ScrollTrigger.create({
            trigger: '#membership',
            start: 'top 75%',
            onEnter: () => {
                if (hasAnimated) return;
                hasAnimated = true;

                let currentPrice = { value: 0 };
                gsap.to(currentPrice, {
                    value: targetPrice,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: () => {
                        priceAmount.textContent = '$' + Math.round(currentPrice.value);
                    }
                });
            }
        });
    }

    // ============================================
    // 11. Navbar Background on Scroll (REMOVED - navbar is now always green/fixed)
    // ============================================

    // ============================================
    // Bonus: About Section Image Reveal
    // ============================================
    const aboutImage = document.querySelector('#about .image-frame');
    if (aboutImage) {
        gsap.fromTo(aboutImage,
            { opacity: 0, x: -40 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    const aboutText = document.querySelector('#about .col-text');
    if (aboutText) {
        gsap.fromTo(aboutText,
            { opacity: 0, x: 40 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '#about',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
});
