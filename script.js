document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // ACCESSIBILITY: Reduced Motion Support
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && typeof gsap !== 'undefined') {
        gsap.globalTimeline.timeScale(100);
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
    }

    // ============================================
    // Mobile Menu (with ARIA management)
    // ============================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';

            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                menuBtn.setAttribute('aria-expanded', 'false');
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
                menuBtn.setAttribute('aria-expanded', 'true');
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
    // Navbar Scroll Effect (Glass Morphism)
    // ============================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
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
    // Schedule Items (Staggered Reveal)
    // ============================================
    const scheduleItems = document.querySelectorAll('.schedule-item');
    if (scheduleItems.length > 0) {
        gsap.fromTo(scheduleItems,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.schedule-list',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
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

    // ============================================
    // Merch: Card Image Carousel (Arrow Navigation)
    // ============================================
    document.querySelectorAll('.merch-carousel').forEach(carousel => {
        const gallery = carousel.querySelector('.merch-gallery');
        const slide = gallery.querySelector('.merch-slide');
        const dataEls = gallery.querySelectorAll('.merch-slides-data span');
        const dotsContainer = gallery.querySelector('.merch-dots');
        const images = Array.from(dataEls).map(el => el.dataset.src);
        let idx = 0;
        let animating = false;

        // Build dots
        images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'merch-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Image ' + (i + 1));
            dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i, i > idx ? 'next' : 'prev'); });
            dotsContainer.appendChild(dot);
        });

        function goTo(i, direction) {
            if (animating || i === idx) return;
            animating = true;

            var outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
            var inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

            slide.classList.add(outClass);
            slide.addEventListener('animationend', function handler() {
                slide.removeEventListener('animationend', handler);
                slide.classList.remove(outClass);
                idx = i;
                slide.src = images[idx];
                slide.classList.add(inClass);
                slide.addEventListener('animationend', function handler2() {
                    slide.removeEventListener('animationend', handler2);
                    slide.classList.remove(inClass);
                    animating = false;
                });
            });

            dotsContainer.querySelectorAll('.merch-dot').forEach((d, j) => {
                d.classList.toggle('active', j === i);
            });
        }

        carousel.querySelector('.merch-arrow-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            goTo((idx - 1 + images.length) % images.length, 'prev');
        });
        carousel.querySelector('.merch-arrow-next').addEventListener('click', (e) => {
            e.stopPropagation();
            goTo((idx + 1) % images.length, 'next');
        });

        // Store index accessor on the gallery element
        gallery._getIndex = () => idx;
        gallery._images = images;
    });

    // ============================================
    // Merch: Lightbox
    // ============================================
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxThumbs = document.getElementById('lightbox-thumbs');
        const lightboxDetails = document.getElementById('lightbox-details');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        let currentImages = [];
        let currentIndex = 0;

        const productDescriptions = {
            hat: {
                title: 'Club Cap',
                description: 'By 2025, the Club had momentum. The dad hat was the natural next chapter\u2014a low-profile white cap with the CPCC crest embroidered front and center. Unstructured fit, adjustable strap, built for long days on the meadow.',
                details: [
                    'Low-profile unstructured fit',
                    'Embroidered CPCC crest',
                    'Adjustable strap',
                    'White cotton twill'
                ]
            },
            shirt: {
                title: 'Inaugural Tee',
                description: 'This is where it started.The 2024 Season Shirt was the first official merchandise ever produced by the Central Park Croquet Club — before the traditions, before the rivalries, before anyone knew how competitive things would get. The front pocket crest keeps it classic: crossed mallets, clean lines, quiet confidence. The back features a hand-drawn Central Park scene — skyline rising beyond the trees, wickets set, friends gathered, summer unfolding. It’s not just a shirt. It’s proof you were there when this was just an idea on a lawn.',
                details: [
                    'Soft white Comfort Colors cotton',
                    'Minimalist green print',
                    'Pocket logo on front',
                    'Hand-drawn Central Park illustration on back',
                    '"Summer 2024" marking'
                ]
            }
        };

        function openLightbox(gallery, startIndex) {
            const product = gallery.dataset.product;
            currentImages = gallery._images;
            currentIndex = startIndex || 0;

            // Build thumbnail strip
            lightboxThumbs.innerHTML = '';
            currentImages.forEach((src, i) => {
                const btn = document.createElement('button');
                btn.innerHTML = '<img src="' + src + '" alt="View ' + (i + 1) + '">';
                if (i === currentIndex) btn.classList.add('active');
                btn.addEventListener('click', () => showImage(i));
                lightboxThumbs.appendChild(btn);
            });

            // Build description
            const desc = productDescriptions[product];
            if (desc) {
                let html = '<h3>' + desc.title + '</h3>';
                html += '<p>' + desc.description + '</p>';
                if (desc.details) {
                    html += '<ul>';
                    desc.details.forEach(d => { html += '<li>' + d + '</li>'; });
                    html += '</ul>';
                }
                lightboxDetails.innerHTML = html;
            }

            showImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function showImage(index) {
            currentIndex = index;
            lightboxImg.src = currentImages[index];
            lightboxImg.alt = 'Product image ' + (index + 1) + ' of ' + currentImages.length;
            lightboxImg.classList.remove('zoomed');
            const thumbBtns = lightboxThumbs.querySelectorAll('button');
            thumbBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightboxImg.classList.remove('zoomed');
            document.body.style.overflow = '';
        }

        // Zoom toggle on image click
        lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.classList.toggle('zoomed');
        });

        // Open on gallery card click
        document.querySelectorAll('.merch-gallery').forEach(gallery => {
            gallery.addEventListener('click', (e) => {
                // Don't open if arrow/dot was clicked (they stopPropagation)
                openLightbox(gallery, gallery._getIndex());
            });
            gallery.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(gallery, gallery._getIndex());
                }
            });
        });

        // Navigation
        prevBtn.addEventListener('click', () => {
            showImage((currentIndex - 1 + currentImages.length) % currentImages.length);
        });
        nextBtn.addEventListener('click', () => {
            showImage((currentIndex + 1) % currentImages.length);
        });

        // Close
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage((currentIndex - 1 + currentImages.length) % currentImages.length);
            if (e.key === 'ArrowRight') showImage((currentIndex + 1) % currentImages.length);
        });
    }

    // ============================================
    // Rules Page: Rule Cards (Staggered Reveal)
    // ============================================
    const ruleCardGroups = document.querySelectorAll('.rules-methods');
    if (ruleCardGroups.length > 0) {
        ruleCardGroups.forEach(group => {
            const cards = group.querySelectorAll('.rule-card');
            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.12,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: group,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }
});
