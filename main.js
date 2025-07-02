// Font loading optimization (moved from <head>)
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
    });
} else {
    // Fallback for older browsers
    setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded');
    }, 100);
}

// Consolidated animation functions
const emojis = ['🤖', '⚡', '🧠', '💫', '🔮', '🌟', '✨', '🚀', '💡', '🎯', '⭐', '🔥', '🎉', '🎊', '🎈', '🌪️', '💥', '🌈', '🦄', '👾', '🎮', '🕹️', '🎪', '🎭', '🎨', '🎵', '🎶', '🥳', '🤩', '😎', '🤯'];

function createFloatingElement(emoji, className = '', duration = 3000) {
    const el = document.createElement('div');
    el.innerHTML = emoji;
    el.className = className;
    Object.assign(el.style, {
        position: 'fixed',
        left: Math.random() * 100 + 'vw',
        top: '-10vh',
        fontSize: (Math.random() * 2 + 1.5) + 'rem',
        zIndex: '-1',
        pointerEvents: 'none',
        animation: `floatDown ${Math.random() * 3 + 2}s ease-out forwards`,
        transform: `rotate(${Math.random() * 360}deg)`
    });

    document.body.appendChild(el);
    setTimeout(() => el.remove(), duration);
}

function createExplosion(x, y, count = 8) {
    const explosionEmojis = ['💥', '✨', '💫'];
    for (let i = 0; i < count; i++) {
        const firework = document.createElement('div');
        firework.innerHTML = explosionEmojis[Math.floor(Math.random() * explosionEmojis.length)];
        Object.assign(firework.style, {
            position: 'fixed',
            left: x + 'px',
            top: y + 'px',
            fontSize: '2rem',
            zIndex: '9999',
            pointerEvents: 'none',
            animation: `explode 1s ease-out forwards`,
            animationDelay: (i * 0.1) + 's'
        });

        document.body.appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }
}

function screenShake() {
    // initiate body shake
    document.body.style.animation = 'screenShake 0.5s ease-in-out';
    // spawn synchronized lightning burst
    createLightning();
    // clear shake after animation
    setTimeout(() => document.body.style.animation = '', 500);
}

// Spread out initial floating emojis to avoid overlap
function positionFloatingEmojis() {
    const MIN_DIST = 15; // minimum distance between emojis (vw/vh units)
    const placed = [];
    document.querySelectorAll('.floating-emoji').forEach(el => {
        let x, y, tries = 0;
        do {
            x = Math.random() * 80 + 10; // 10–90 vw
            y = Math.random() * 80 + 10; // 10–90 vh
            tries++;
        } while (placed.some(p => Math.hypot(p.x - x, p.y - y) < MIN_DIST) && tries < 30);

        placed.push({ x, y });
        el.style.left = x + 'vw';
        el.style.top = y + 'vh';
    });
}

// Event listeners
// Click explosion anywhere
document.addEventListener('click', (e) => createExplosion(e.clientX, e.clientY));

// Logo click animations
document.querySelectorAll('.brand-logo, .hero-logo').forEach(logo => {
    logo.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => this.style.animation = '', 100);

        // Emoji explosion
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createFloatingElement(emojis[Math.floor(Math.random() * emojis.length)]), i * 50);
        }

        screenShake();
        flashColorShift();
    });
});

// Periodic animations
setInterval(() => createFloatingElement(emojis[Math.floor(Math.random() * emojis.length)]), 1500);
setInterval(() => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFloatingElement(emojis[Math.floor(Math.random() * emojis.length)]), i * 150);
    }
}, 8000);
setInterval(screenShake, 10000);

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.feature-preview').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    observer.observe(el);
});

// Position emojis once everything is loaded
positionFloatingEmojis();

// === Lightning bolt effect ===
function spawnBolt(cloudBox) {
    const bolt = document.createElement('div');
    bolt.className = 'lightning-bolt';
    bolt.innerHTML = '⚡';
    const cloudWidth = cloudBox.offsetWidth;
    const cloudHeight = cloudBox.offsetHeight;
    // spawn from middle top area
    bolt.style.left = (Math.random() * 0.6 + 0.2) * cloudWidth + 'px';
    bolt.style.top = cloudHeight * 0.4 + 'px';
    bolt.style.fontSize = (Math.random() * 3 + 3) + 'rem';
    cloudBox.appendChild(bolt);

    // compute scatter destination
    const dx = (Math.random() * 2 - 1) * 120; // -120..120px
    const dy = (Math.random() * 2 - 1) * 120; // -120..120px
    requestAnimationFrame(() => {
        bolt.style.opacity = 1;
        bolt.style.transform = `translate(${dx}px, ${dy}px) scale(1.3) rotate(${Math.random() * 40 - 20}deg)`;
    });
    setTimeout(() => bolt.remove(), 900);
}

function createLightning() {
    const cloudBox = document.querySelector('.cloud-container');
    if (!cloudBox) return;
    const bolts = Math.floor(Math.random() * 6) + 3; // 3-8 bolts
    for (let i = 0; i < bolts; i++) setTimeout(() => spawnBolt(cloudBox), i * 100);
}

// Flashing hue shift effect
function flashColorShift() {
    const flashes = 8;
    for (let i = 0; i < flashes; i++) {
        setTimeout(() => { document.body.style.filter = 'grayscale(1) brightness(1.3)'; }, i * 200);
        setTimeout(() => { document.body.style.filter = ''; }, i * 200 + 100);
    }
}

// ===== Pull-to-refresh: drag down to reload the page =====
(function enablePullToRefresh() {
    let startY = null;
    const THRESHOLD = 80; // pixels pulled down required to trigger refresh

    // Record initial Y when touch starts at top of the page
    window.addEventListener('touchstart', (e) => {
        if (document.scrollingElement.scrollTop === 0) {
            startY = e.touches[0].clientY;
        } else {
            startY = null;
        }
    }, { passive: true });

    // Check distance moved; if beyond threshold then reload
    window.addEventListener('touchmove', (e) => {
        if (startY === null) return;
        const currentY = e.touches[0].clientY;
        if (currentY - startY > THRESHOLD) {
            startY = null;
            location.reload();
        }
    }, { passive: true });

    // Reset on touch end
    window.addEventListener('touchend', () => {
        startY = null;
    });
})(); 