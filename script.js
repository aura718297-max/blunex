(function () {
    if (typeof VanillaTilt === 'undefined') return;

    const cards = document.querySelectorAll('.cr-reviews-section .cr-card');
    if (!cards.length) return;

    VanillaTilt.init(cards, {
        max: 12,
        speed: 800,
        glare: true,
        'max-glare': 0.3,
        perspective: 1000,
    });
})();

(function () {
    const carousel = document.getElementById('ai-reel-carousel');
    const playDot = document.getElementById('ai-reel-play-dot');
    const statusText = document.getElementById('ai-reel-status-text');
    if (!carousel || !playDot || !statusText) return;

    const videoSources = [
        'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-of-a-swimming-pool-1188-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-blue-ink-in-water-525-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-motion-graphics-of-a-spinning-earth-planet-1948-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-clipping-of-a-green-mountain-range-under-a-blue-sky-4556-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-mysterious-pale-looking-moon-with-clouds-passing-by-4431-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-dense-forest-1254-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-moving-white-particles-over-black-background-34561-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-in-the-wind-1229-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-1181-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-underwater-shot-of-a-school-of-fish-1191-large.mp4',
        'https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-down-a-mountain-41551-large.mp4'
    ];

    const radius = 520;
    const cards = [];
    let rotation = 0;
    let isPaused = false;
    let resumeTimeout;

    function updateFocus() {
        cards.forEach((card, index) => {
            const baseAngle = (360 / cards.length) * index;
            const currentAngle = (baseAngle + rotation) % 360;
            const normalizedAngle = ((currentAngle + 180) % 360 + 360) % 360 - 180;
            const isCentered = Math.abs(normalizedAngle) < 10;
            const tilt = isCentered ? 0 : normalizedAngle < 0 ? 30 : -30;
            card.style.transform = `rotateY(${baseAngle}deg) translateZ(${radius}px) rotateZ(${tilt}deg) scale(${isCentered ? 1.15 : 1})`;
            card.classList.toggle('is-focused', isCentered);
        });
    }

    function focusCard(index) {
        isPaused = true;
        clearTimeout(resumeTimeout);
        rotation = (Math.round(rotation / 360) * 360) - (360 / cards.length) * index;
        carousel.style.transition = 'transform .8s cubic-bezier(.2,0,.2,1)';
        carousel.style.transform = `rotateY(${rotation}deg)`;
        statusText.textContent = `FOCUSED ON TRACK ${index + 1}`;
        playDot.classList.remove('is-animating');
        playDot.classList.add('is-paused');
        updateFocus();
        resumeTimeout = setTimeout(() => {
            carousel.style.transition = 'none';
            isPaused = false;
            statusText.textContent = 'AUTO-PLAYING REEL';
            playDot.classList.add('is-animating');
            playDot.classList.remove('is-paused');
            animate();
        }, 4000);
    }

    function animate() {
        if (isPaused) return;
        rotation -= .05;
        carousel.style.transform = `rotateY(${rotation}deg)`;
        updateFocus();
        requestAnimationFrame(animate);
    }

    videoSources.forEach((source, index) => {
        const card = document.createElement('div');
        card.className = 'ai-reel-card';
        const video = document.createElement('video');
        video.src = source;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const info = document.createElement('div');
        info.className = 'ai-reel-card-info';
        info.innerHTML = `<strong>TRACK ${index + 1}</strong><br>Status: Active`;
        card.append(video, info);
        card.addEventListener('click', () => focusCard(index));
        carousel.appendChild(card);
        cards.push(card);
    });

    animate();
})();

if (typeof gsap !== 'undefined') {
    gsap.from(".logo", {
        x: '-100%',
        duration: 1
    });

    gsap.from("nav", {
        opacity: 0,
        y: '100%',
        duration: 1
    });

    gsap.from(".btn", {
        x: '100%',
        duration: 1
    });

    gsap.from(".social-wrapper", {
        opacity: 0,
        y: '100%',
        duration: 1
    });

    gsap.from("p", {
        opacity: 0,
        duration: 1,
        delay: 1
    });

    if (typeof SplitText !== 'undefined') {
        gsap.registerPlugin(SplitText);
        const split = SplitText.create("h1", { type: "words, chars" });
        gsap.from(split.words, {
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            duration: 1.2,
            ease: "back",
            stagger: 0.25
        });
    } else {
        gsap.from("h1", {
            y: -50,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('split-slider-trigger') && typeof ScrollTrigger !== 'undefined') {
        const pinnedSections = Array.from(document.querySelectorAll('.cardb.pinned'));
        const sectionsToFree = new Set(pinnedSections.slice(0, 2));
        ScrollTrigger.getAll().forEach((trigger) => {
            if (!trigger.vars.pin || sectionsToFree.has(trigger.trigger)) trigger.kill();
        });
    }
});

if (document.getElementById('split-slider-trigger')) {
    const footerSection = document.querySelector('footer')?.closest('section.cardb');
    if (footerSection) {
        footerSection.classList.remove('pinned');
        footerSection.classList.add('card', 'scroll');
    }
}

function goToPage(index) {
    const pages = document.querySelectorAll('.resume-page');
    const dots = document.querySelectorAll('.dot');

    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

(function () {
    const toggleBtn = document.querySelector('.hamburger-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!toggleBtn || !mainNav) return;

    const mediaQuery = window.matchMedia('(max-width: 900px)');
    let isMobile = mediaQuery.matches;

    const hideMenu = () => {
        if (!isMobile) return;
        mainNav.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
    };

    const showMenu = () => {
        if (!isMobile) return;
        mainNav.classList.add('open');
        toggleBtn.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
    };

    // hover support for desktop-like touch devices
    toggleBtn.addEventListener('mouseenter', showMenu);
    mainNav.addEventListener('mouseenter', showMenu);

    // keep previous mouseleave logic but guard by mobile
    toggleBtn.addEventListener('mouseleave', (event) => {
        if (!isMobile) return;
        const related = event.relatedTarget;
        if (mainNav.contains(related)) return;
        hideMenu();
    });

    mainNav.addEventListener('mouseleave', (event) => {
        if (!isMobile) return;
        const related = event.relatedTarget;
        if (toggleBtn.contains(related)) return;
        hideMenu();
    });

    // allow click/tap to toggle on small screens
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isMobile = mediaQuery.matches;
        if (!isMobile) return;
        if (mainNav.classList.contains('open')) hideMenu();
        else showMenu();
    });

    // close nav when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (!isMobile) return;
        if (!mainNav.contains(e.target) && !toggleBtn.contains(e.target)) hideMenu();
    });

    const handleResize = (event) => {
        isMobile = event.matches;
        if (!isMobile) {
            mainNav.classList.remove('open');
            toggleBtn.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    };

    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', handleResize);
    else mediaQuery.addListener(handleResize);
})();

// Removed unused constants and arrays (titles, imgUrls) to keep code clean.

(function() {
    const AG_CONFIG = {
        cardCount: 9,
        gap: 350,
        depth: 180,
        lerp: 0.06,
        image: "input_file_1.jpeg"
    };

    const agSliderRoot = document.getElementById('ag-slider-root');
    const agHeading = document.getElementById('ag-headingParent');
    const agPrev = document.getElementById('ag-btn-prev');
    const agNext = document.getElementById('ag-btn-next');

    if (!agSliderRoot || !agHeading || !agPrev || !agNext) return;
    
    let agSlideElements = [];
    let agTarget = 0;
    let agCurrent = 0;
    const agTotalWidth = AG_CONFIG.cardCount * AG_CONFIG.gap;

    function initArcGallery() {
        for (let i = 0; i < AG_CONFIG.cardCount; i++) {
            const anchor = document.createElement('a');
            anchor.className = 'ag-card-link';
            anchor.href = '#';

            const card = document.createElement('div');
            card.className = 'ag-card';
            card.innerHTML = `
                <img src="${AG_CONFIG.image}" class="ag-card-image">
                <div class="ag-card-label">VIEW PROJECT</div>
            `;
            
            anchor.appendChild(card);
            agSliderRoot.appendChild(anchor);
            agSlideElements.push(anchor);

            anchor.addEventListener('mousemove', (e) => {
                const rect = anchor.getBoundingClientRect();
                const dx = (e.clientX - rect.left) - rect.width / 2;
                const dy = (e.clientY - rect.top) - rect.height / 2;
                gsap.to(card, { rotationY: dx / 15, rotationX: -dy / 15, duration: 0.4 });
            });
            anchor.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.5 });
            });
        }
        
        agPrev.addEventListener('click', () => { agTarget += AG_CONFIG.gap; });
        agNext.addEventListener('click', () => { agTarget -= AG_CONFIG.gap; });

        renderArc();
    }

    function getAgTransform(index, offset) {
        let wrappedOffset = (index * AG_CONFIG.gap - offset) % agTotalWidth;
        if (wrappedOffset > agTotalWidth / 2) wrappedOffset -= agTotalWidth;
        if (wrappedOffset < -agTotalWidth / 2) wrappedOffset += agTotalWidth;

        const absDist = Math.abs(wrappedOffset);
        const normalizedDist = absDist / (agSliderRoot.clientWidth / 2);

        const x = (agSliderRoot.clientWidth / 2) + wrappedOffset - (320 / 2);
        const y = (agSliderRoot.clientHeight * 0.4) + (Math.pow(normalizedDist, 2) * AG_CONFIG.depth);
        const scale = 1 - (Math.min(normalizedDist, 1) * 0.35);
        const opacity = 1.4 - normalizedDist;
        const rotation = wrappedOffset * 0.05;

        return { x, y, scale, opacity, rotation, zIndex: Math.round(100 - absDist / 5) };
    }

    function renderArc() {
        agCurrent += (agTarget - agCurrent) * AG_CONFIG.lerp;
        gsap.set(agHeading, { x: -agCurrent * 0.1 });

        agSlideElements.forEach((el, i) => {
            const t = getAgTransform(i, agCurrent);
            gsap.set(el, { 
                x: t.x, y: t.y, scale: t.scale, 
                opacity: t.opacity, rotationZ: t.rotation, zIndex: t.zIndex 
            });
        });
        requestAnimationFrame(renderArc);
    }

    let agDragging = false;
    let agStartX = 0;

    const startDrag = (x) => { agDragging = true; agStartX = x; };
    const moveDrag = (x) => {
        if (!agDragging) return;
        agTarget += (agStartX - x) * 1.5;
        agStartX = x;
    };

    agSliderRoot.addEventListener('mousedown', (e) => startDrag(e.clientX));
    window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    window.addEventListener('mouseup', () => agDragging = false);
    
    agSliderRoot.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    agSliderRoot.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
    agSliderRoot.addEventListener('touchend', () => agDragging = false);

    agSliderRoot.addEventListener('wheel', (e) => {
        agTarget += e.deltaY * 0.8;
    }, { passive: true });

    initArcGallery();
})();

(function () {
    const root = document.getElementById('vibe-gallery-root');
    if (!root) return;

    const cards = root.querySelectorAll('.vibe-card');
    const filterBtns = root.querySelectorAll('.vibe-filter-btn');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            root.querySelector('.vibe-filter-btn.active')?.classList.remove('active');
            btn.classList.add('active');

            const filter = btn.getAttribute('data-vibe-filter');
            cards.forEach((card) => {
                const cat = card.getAttribute('data-vibe-cat');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('vibe-hide');
                } else {
                    card.classList.add('vibe-hide');
                }
            });
        });
    });

    cards.forEach((card) => {
        const pContainer = document.createElement('div');
        pContainer.className = 'vibe-p-wrap';
        card.appendChild(pContainer);

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 12;
            const rotateY = (rect.width / 2 - x) / 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            if (Math.random() > 0.88) {
                const dot = document.createElement('div');
                dot.className = 'vibe-dot';
                dot.style.left = '50%';
                dot.style.top = '50%';
                dot.style.setProperty('--tx', `${(Math.random() - 0.5) * 140}px`);
                dot.style.setProperty('--ty', `${(Math.random() - 0.5) * 140}px`);
                pContainer.appendChild(dot);
                setTimeout(() => dot.remove(), 1000);
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            pContainer.innerHTML = '';
        });
    });

    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        const auras = root.querySelectorAll('.vibe-aura');

        auras.forEach((aura, i) => {
            aura.style.transform = `translate(${moveX * (i + 1)}px, ${moveY * (i + 1)}px)`;
        });

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        root.style.background = `linear-gradient(135deg, #16384c 0%, #1a4d6d ${x * 40}%, #0f2a3f ${y * 45}%)`;
    });
})();
(function () {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    ['footer-to-top', 'footer-mobile-to-top'].forEach((id) => {
        document.getElementById(id)?.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: 'smooth' })
        );
    });

    const isMobile = window.matchMedia('(max-width: 700px)');
    document.querySelectorAll('.footer-accordion').forEach((section) => {
        section.querySelector('.footer-toggle').addEventListener('click', () => {
            if (!isMobile.matches) return;
            const open = section.classList.contains('is-open');
            document.querySelectorAll('.footer-accordion').forEach(s => s.classList.remove('is-open'));
            section.classList.toggle('is-open', !open);
        });
    });
})();

// GSAP Stacked Card Pinning Effect (from ai_studio_code (3).html)
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lastCard = document.querySelector(".card.scroll");
    const pinnedSections = gsap.utils.toArray(".card.pinned");

    if (!pinnedSections.length) return;

    pinnedSections.forEach((section, index, sections) => {
        const innerWrapper = section.querySelector('.container-about, .ag-page-container, .vibe-container, .cr-container, .ai-reel-scene') || section;
        const nextSection = sections[index + 1] || lastCard;
        if (!nextSection) return;

        // PIN THE CARD: Keeps section fixed on screen while next card slides over top
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                endTrigger: nextSection,
                end: "top top",
                pin: true,
                pinSpacing: false, // Allows cards to stack on top of each other
                scrub: 1
            }
        });

        // SCALE THE CONTENT: Shrinks & fades inner content as you scroll into the next section
        gsap.fromTo(innerWrapper, 
            { scale: 1, opacity: 1 }, 
            { 
                scale: 0.82, 
                opacity: 0.4,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    endTrigger: nextSection,
                    end: "top top",
                    scrub: 1
                }
            }
        );
    });
});



