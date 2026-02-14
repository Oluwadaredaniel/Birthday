/**
 * ========================================
 * CINEMATIC ENGINE: A STORY OF YOU
 * Author: Senior Frontend Architect
 * Logic: Narrative Flow, Particle Systems, 3D Parallax
 * ========================================
 */

// Memory Data Repository - Highly Curated Visual Sequence
const MEMORY_REPOSITORY = [
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0026(1).jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0032(1).jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0040.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0024.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0031(1).jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0030.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0035.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0034.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0022(1).jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0021.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0032.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0009.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0033.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0028.jpg",
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0013.jpg"
];

// Narrative Sequence Phrases (Typewriter Logic)
const NARRATIVE_PHRASES = [
  "I've been keeping a vault... of every reason I love you.",
  "A collection of fragments, of light, and of our shared time.",
  "Happy Birthday, my beautiful soul. Let's walk through our story."
];

// The Eternal Letter - Final Transition Component
const ETERNAL_LETTER = {
  header: "To the light of my life...",
  content: "Happy Birthday, my love. You are the most beautiful chapter in my story, and I never want this book to end. Thank you for your kindness, your laughter, and for loving me exactly as I am. May today be as extraordinary as you make my life feel every single day. Always and forever.",
  seal: "❤"
};

/**
 * --- CORE ARCHITECTURE ---
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM ELEMENT REGISTRY
  const elements = {
    loader: document.getElementById('scene-loading'),
    progressBar: document.getElementById('loader-progress'),
    sceneLocked: document.getElementById('scene-locked'),
    sceneIntro: document.getElementById('scene-intro'),
    sceneOverview: document.getElementById('scene-overview'),
    sceneGallery: document.getElementById('scene-gallery'),
    vaultDoor: document.getElementById('vault-door'),
    vaultWheel: document.getElementById('vault-wheel'),
    vaultGlow: document.getElementById('vault-glow'),
    focusOverlay: document.getElementById('focus-overlay'),
    heroGuide: document.getElementById('hero-character'),
    introText: document.getElementById('intro-text'),
    moodCollage: document.getElementById('mood-collage'),
    galleryTrack: document.getElementById('horizontal-track'),
    closeGalleryBtn: document.getElementById('close-gallery'),
    bgAudio: document.getElementById('bg-music'),
    audioUI: document.getElementById('audio-control'),
    mainCanvas: document.getElementById('ambient-canvas')
  };

  // State Management
  let isGalleryActive = false;
  let hasTransitioned = false;

  // Initialize Global Visual Systems
  initParticleSystem(elements.mainCanvas);
  generateBalloons();

  /**
   * 1. CONTENT ENGINE
   * Assembles the visual data into DOM structures
   */
  const assembledContent = MEMORY_REPOSITORY.map((imgUrl) => ({ type: 'visual', url: imgUrl }));
  assembledContent.push({ type: 'letter' }); // Append the final heart message

  assembledContent.forEach((data, index) => {
    // Render the Infinite Mosaic (Overview)
    elements.moodCollage.appendChild(createMosaicTile(data, index));
    // Render the Deep Gallery Slides (Detail View)
    elements.galleryTrack.appendChild(createGallerySlide(data, index));
  });

  /**
   * 2. LOADING SEQUENCE
   * Simulates data assembly with a cinematic progress bar
   */
  const runBootloader = () => {
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
      currentProgress += Math.random() * 18;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressTimer);
        
        // Initial transition to Vault Scene
        setTimeout(() => {
          transitionScene(elements.loader, elements.sceneLocked);
        }, 800);
      }
      elements.progressBar.style.width = `${currentProgress}%`;
    }, 140);
  };

  window.addEventListener('load', runBootloader);

  /**
   * 3. VAULT INTERACTION LOGIC
   * Handles the "Tap to Begin" and mechanical animation of the vault
   */
  elements.focusOverlay.addEventListener('click', async () => {
    if (hasTransitioned) return;
    hasTransitioned = true;

    // Phase A: Audio Initialization & Focus Fade
    elements.focusOverlay.style.opacity = '0';
    setTimeout(() => elements.focusOverlay.style.display = 'none', 1800);
    
    // Play with fallback handling
    elements.bgAudio.play().catch(() => console.log("Audio waiting for user gesture..."));
    elements.audioUI.classList.add('visible');

    // Phase B: Guide Character Entrance
    elements.heroGuide.classList.remove('hidden');
    elements.heroGuide.style.left = 'calc(50% - 220px)';

    await cinematicDelay(4800);

    // Phase C: Mechanical Unlocking
    elements.vaultWheel.style.transform = 'rotate(1440deg)';
    await cinematicDelay(2400);
    
    elements.vaultDoor.style.transform = 'rotateY(-112deg)';
    elements.vaultGlow.style.opacity = '1';

    await cinematicDelay(3500);

    // Phase D: Deep Transition to Prologue
    await transitionScene(elements.sceneLocked, elements.sceneIntro);
    await runNarrativeEngine(elements.introText, NARRATIVE_PHRASES);
    
    // Phase E: The Reveal
    await transitionScene(elements.sceneIntro, elements.sceneOverview);
    revealMosaicTiles();
  });

  /**
   * 4. TRANSITION ARCHITECTURE
   * Handles cross-fades and transform-based scene swaps
   */
  async function transitionScene(from, to, effect = 'cinematic') {
    if (from) {
      from.classList.remove('visible');
      await cinematicDelay(1800);
      from.classList.remove('active');
    }
    if (to) {
      to.classList.add('active');
      void to.offsetWidth; // Force Reflow
      to.classList.add('visible');
      await cinematicDelay(1400);
    }
  }

  /**
   * 5. TYPEWRITER / NARRATIVE ENGINE
   * Handles the emotional text transitions with character-level pacing
   */
  async function runNarrativeEngine(container, textArray) {
    for (const phrase of textArray) {
      container.innerText = "";
      // Type-in
      for (const char of phrase) {
        container.innerText += char;
        await cinematicDelay(55);
      }
      await cinematicDelay(3200);
      
      // Erase effect (if not the last one)
      if (textArray.indexOf(phrase) < textArray.length - 1) {
        for (let i = phrase.length; i >= 0; i--) {
          container.innerText = phrase.slice(0, i);
          await cinematicDelay(18);
        }
      }
    }
  }

  /**
   * 6. COMPONENT FACTORY
   * Generates DOM elements for Mosaic and Gallery
   */
  function createMosaicTile(data, index) {
    const tile = document.createElement('div');
    tile.className = 'mood-tile';
    
    if (data.type === 'visual') {
      tile.innerHTML = `
        <img src="${data.url}" alt="Memory Fragment" loading="lazy">
        <div class="tile-glow"></div>
      `;
    } else {
      // Specialized Letter Tile
      tile.style.background = "linear-gradient(135deg, #1d0a21, #05010a)";
      tile.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--accent-color); font-family:var(--font-cursive); font-size:1.8rem; text-align:center; padding:2rem;">
          <span>The Heart of Us</span>
          <div style="font-size: 0.6rem; font-family: var(--font-sans); margin-top: 1.2rem; opacity: 0.3; letter-spacing: 0.5em; text-transform: uppercase;">A Final Wish</div>
        </div>
      `;
    }
    
    tile.addEventListener('click', () => openGalleryAt(index));
    return tile;
  }

  function createGallerySlide(data, index) {
    const slide = document.createElement('div');
    slide.className = 'memory-slide';
    
    if (data.type === 'letter') {
      slide.innerHTML = `
        <div class="envelope-slide">
          <p class="letter-text">${ETERNAL_LETTER.content}</p>
          <div class="wax-seal">${ETERNAL_LETTER.seal}</div>
        </div>
      `;
    } else {
      slide.innerHTML = `
        <div class="slide-inner" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
          <img src="${data.url}" alt="Pure Visual Memory" style="max-width:100%; max-height:100%; object-fit:contain;">
        </div>
      `;
    }
    return slide;
  }

  /**
   * 7. GALLERY NAVIGATION ENGINE
   * Handles opening the gallery and initializing the 3D parallax scroller
   */
  async function openGalleryAt(index) {
    isGalleryActive = true;
    await transitionScene(elements.sceneOverview, elements.sceneGallery);
    
    const slides = document.querySelectorAll('.memory-slide');
    const target = slides[index];
    
    if (target) {
      // Calculate perfect center alignment
      const scrollTarget = target.offsetLeft - (elements.galleryTrack.offsetWidth / 2) + (target.offsetWidth / 2);
      elements.galleryTrack.scrollTo({ left: scrollTarget, behavior: 'instant' });
      initGalleryParallax(slides);
    }
  }

  elements.closeGalleryBtn.addEventListener('click', () => {
    isGalleryActive = false;
    transitionScene(elements.sceneGallery, elements.sceneOverview);
  });

  /**
   * 8. PARALLAX & FOCUS ENGINE
   * Controls the "curved" depth effect when scrolling through images
   */
  function initGalleryParallax(slides) {
    // Intersection Observer for focusing the current slide
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('focused');
        else entry.target.classList.remove('focused');
      });
    }, { root: elements.galleryTrack, threshold: 0.5 });

    slides.forEach(s => observer.observe(s));

    // Dynamic 3D Transform Logic
    elements.galleryTrack.addEventListener('scroll', () => {
      if (!isGalleryActive) return;
      
      const trackCenter = elements.galleryTrack.scrollLeft + (elements.galleryTrack.offsetWidth / 2);
      
      slides.forEach(slide => {
        const slideCenter = slide.offsetLeft + (slide.offsetWidth / 2);
        const distance = slideCenter - trackCenter;
        const normalizedDist = distance / (elements.galleryTrack.offsetWidth / 2);
        
        // Calculations for Cinematic Depth
        const rotY = distance * -0.045; // Subtle curve
        const zAxis = Math.abs(normalizedDist) * -240; // Push back blurred items
        const scaleVal = 1 - (Math.abs(normalizedDist) * 0.12);
        
        slide.style.transform = `rotateY(${rotY}deg) translateZ(${zAxis}px) scale(${scaleVal})`;
        slide.style.opacity = 1 - Math.min(Math.abs(normalizedDist) * 0.75, 1);
      });
    });
  }

  function revealMosaicTiles() {
    const tiles = document.querySelectorAll('.mood-tile');
    tiles.forEach((tile, i) => {
      setTimeout(() => tile.classList.add('spill-active'), i * 90);
    });
  }

  /**
   * 9. ATMOSPHERIC VISUAL SYSTEMS
   * Particle Canvas & Floating Elements
   */
  function initParticleSystem(canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    
    const setDimensions = () => { 
      width = canvas.width = window.innerWidth; 
      height = canvas.height = window.innerHeight; 
    };
    
    window.addEventListener('resize', setDimensions);
    setDimensions();
    
    // Orb Factory
    for (let i = 0; i < 16; i++) {
      particles.push({
        x: Math.random() * width, 
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.15, 
        dy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 550 + 350,
        // Cinematic Purples and Gold Tints
        color: Math.random() > 0.7 ? 'rgba(78, 26, 82, 0.15)' : 'rgba(251, 191, 36, 0.05)'
      });
    }

    function renderLoop() {
      // High-performance background clearing
      ctx.fillStyle = '#05010a'; 
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        
        // Wrapping screen logic
        if (p.x < -p.radius) p.x = width + p.radius; 
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius; 
        if (p.y > height + p.radius) p.y = -p.radius;
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color); 
        grad.addColorStop(1, 'transparent');
        
        ctx.fillStyle = grad; 
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); 
        ctx.fill();
      });
      requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }

  function generateBalloons() {
    const container = document.getElementById('balloon-container');
    const balloonCount = 22;
    for (let i = 0; i < balloonCount; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = (Math.random() * 100) + 'vw';
      b.style.animationDelay = (Math.random() * 40) + 's';
      b.style.background = `rgba(251, 191, 36, ${0.03 + Math.random() * 0.06})`;
      container.appendChild(b);
    }
  }

  /**
   * --- UTILITIES ---
   */
  function cinematicDelay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
});
