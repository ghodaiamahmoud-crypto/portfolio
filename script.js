document.addEventListener('DOMContentLoaded', () => {

    const themeBtn = document.getElementById('themeBtn');

    if (themeBtn) {
        const themeIcon = themeBtn.querySelector('i');
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');

            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            const isLight = document.body.classList.contains('light-mode');

            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun', !isLight);
                themeIcon.classList.toggle('fa-moon', isLight);
            }
        });
    }


    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');

        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 1000);
        }
    });


    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = menuBtn.querySelector('i');

            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');

                const icon = menuBtn.querySelector('i');

                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }


    const heroSubtitle = document.querySelector('.hero h2');

    if (heroSubtitle) {
        const roles = [
            "Junior Web Developer",
            "Computer Science Student",
            "Network Security Learner"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                heroSubtitle.textContent =
                    currentRole.substring(0, charIndex - 1);

                charIndex--;
                typingDelay = 50;
            } else {
                heroSubtitle.textContent =
                    currentRole.substring(0, charIndex + 1);

                charIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500;
            }

            setTimeout(typeEffect, typingDelay);
        }

        typeEffect();
    }


    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');

            if (
                link.getAttribute('href') ===
                `#${currentSectionId}`
            ) {
                link.classList.add('active');
            }
        });
    });


    const revealElements = document.querySelectorAll(
        '.skill-card, .project-card, .service-card, .info-box, .timeline-item'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition =
            'opacity 0.6s ease-out, transform 0.6s ease-out';
    });


    const animateProgressBars = (container) => {
        const progressBars =
            container.querySelectorAll('.progress span');

        progressBars.forEach(bar => {

            if (!bar.dataset.animated) {

                const targetWidth = bar.getAttribute('style');

                bar.style.width = '0%';

                setTimeout(() => {

                    bar.style.transition =
                        'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';

                    bar.style.width = targetWidth
                        ? targetWidth.replace('width:', '')
                        : '100%';

                }, 100);

                bar.dataset.animated = 'true';
            }
        });
    };


    const revealOnScroll = () => {

        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {

            const elementTop =
                el.getBoundingClientRect().top;

            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {

                el.style.opacity = '1';

                el.style.transform =
                    'translateY(0)';

                animateProgressBars(el);
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);

    revealOnScroll();


    const tiltCards = document.querySelectorAll(
        '.project-card, .service-card, .skill-card'
    );

    tiltCards.forEach(card => {

        card.addEventListener('mousemove', e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 25;

            const rotateY =
                (centerX - x) / 25;

            card.style.transform =
                `perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {

            card.style.transform =
                'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });


    const spotlightCards = document.querySelectorAll(
        '.project-card, .service-card, .info-box'
    );

    spotlightCards.forEach(card => {

        card.addEventListener('mousemove', e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            card.style.setProperty(
                '--mouse-x',
                `${x}px`
            );

            card.style.setProperty(
                '--mouse-y',
                `${y}px`
            );
        });
    });


    const contactForm =
        document.getElementById('contactForm');

    if (contactForm) {

        contactForm.addEventListener('submit', e => {

            e.preventDefault();

            const submitBtn =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            if (!submitBtn) return;

            const originalBtnText =
                submitBtn.innerHTML;

            submitBtn.disabled = true;

            submitBtn.innerHTML =
                'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {

                alert(
                    'Thank you! Your message has been sent successfully.'
                );

                contactForm.reset();

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    originalBtnText;

            }, 1500);
        });
    }


    const filterButtons =
        document.querySelectorAll('.filter-btn');

    const projectCards =
        document.querySelectorAll('.project-card');


    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });


            button.classList.add('active');


            projectCards.forEach(card => {

                const showCard =
                    filter === 'all' ||
                    card.classList.contains(filter);


                if (showCard) {

                    card.style.display = 'flex';

                    setTimeout(() => {

                        card.style.opacity = '1';

                        card.style.transform =
                            'translateY(0)';

                    }, 50);

                } else {

                    card.style.opacity = '0';

                    card.style.transform =
                        'translateY(20px)';


                    setTimeout(() => {

                        card.style.display = 'none';

                    }, 300);
                }

            });

        });

    });

});