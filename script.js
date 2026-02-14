import { GoogleGenAI } from "@google/genai";

/**
 * ========================================
 * CINEMATIC ENGINE: A STORY OF YOU
 * Dynamic Asset Materialization & Narrative Logic
 * ========================================
 */

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

const NARRATIVE_PHRASES = [
  "I've been keeping a vault... of every reason I love you.",
  "A collection of fragments, of light, and of our shared time.",
  "Happy Birthday, my beautiful soul. Let's walk through our story."
];

const ETERNAL_LETTER = {
  content: "Happy Birthday, my love. You are the most beautiful chapter in my story, and I never want this book to end. Thank you for your kindness, your laughter, and for loving me exactly as I am. May today be as extraordinary as you make my life feel every single day. Always and forever.",
  seal: "❤"
};

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    loader: document.getElementById('scene-loading'),
    progressBar: document.getElementById('loader-progress'),
    loaderMsg: document.getElementById('loader-message'),
    sceneLocked: document.getElementById('scene-locked'),
    sceneIntro: document.getElementById('scene-intro'),
    sceneOverview: document.getElementById('scene-overview'),
    sceneGallery: document.getElementById('scene-gallery'),
    vaultDoor: document.getElementById('vault-door'),
    vaultDoorImg: document.getElementById('vault-door-img'),
    vaultWheel: document.getElementById('vault-wheel'),
    vaultGlow: document.getElementById('vault-glow'),
    focusOverlay: document.getElementById('focus-overlay'),
    heroGuide: document.getElementById('hero-character'),
    chibiContainer: document.getElementById('chibi-image-container'),
    introText: document.getElementById('intro-text'),
    moodCollage: document.getElementById('mood-collage'),
    galleryTrack: document.getElementById('horizontal-track'),
    closeGalleryBtn: document.getElementById('close-gallery'),
    mainCanvas: document.getElementById('ambient-canvas')
  };

  let isGalleryActive = false;
  let hasTransitioned = false;

  initParticleSystem(elements.mainCanvas);
  generateBalloons();

  /**
   * 1. ASSET MATERIALIZATION (Gemini GenAI)
   */
  async function materializeAssets() {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    elements.loaderMsg.innerText = "Materializing hyper-realistic vault...";
    
    try {
      // 1. Generate Vault Texture
      const vaultResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: "Hyper-realistic cinematic professional photo of a heavy premium bank vault door made of brushed dark titanium and polished gold, intricate mechanical details, soft atmospheric lighting, 8k resolution, photorealistic metallic texture." }]
      });
      
      for (const part of vaultResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          elements.vaultDoorImg.style.backgroundImage = `url(data:image/png;base64,${part.inlineData.data})`;
        }
      }

      elements.loaderMsg.innerText = "Summoning your realistic guide...";
      
      // 2. Generate Realistic Chibi Guide
      const chibiResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: "A hyper-realistic 3D cute chibi character of a beautiful woman, soft photorealistic skin, wearing a cozy elegant scarf, large expressive eyes, Pixar/Disney style high-end 3D render, 8k, volumetric lighting, centered composition, blurred background." }]
      });
      
      for (const part of chibiResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          const img = new Image();
          img.src = `data:image/png;base64,${part.inlineData.data}`;
          img.alt = "Realistic Guide";
          elements.chibiContainer.innerHTML = ''; // Clear previous
          elements.chibiContainer.appendChild(img);
        }
      }
    } catch (error) {
      console.warn("Asset generation failed. Check API key and internet connection.", error);
      elements.vaultDoorImg.style.backgroundColor = "#1a1a1a";
    }
  }

  /**
   * 2. CONTENT ASSEMBLY
   */
  const assembledContent = MEMORY_REPOSITORY.map((url) => ({ type: 'visual', url }));
  assembledContent.push({ type: 'letter' });

  assembledContent.forEach((data, index) => {
    elements.moodCollage.appendChild(createMosaicTile(data, index));
    elements.galleryTrack.appendChild(createGallerySlide(data, index));
  });

  /**
   * 3. BOOTLOADER SEQUENCE
   */
  async function runBootloader() {
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
      if (currentProgress < 90) currentProgress += 0.5;
      elements.progressBar.style.width = `${currentProgress}%`;
    }, 50);

    // Run dynamic generation
    await materializeAssets();
    
    currentProgress = 100;
    elements.progressBar.style.width = `100%`;
    clearInterval(progressTimer);
    
    setTimeout(() => transitionScene(elements.loader, elements.sceneLocked), 1000);
  }

  runBootloader();

  /**
   * 4. VAULT INTERACTION
   */
  elements.focusOverlay.addEventListener('click', async () => {
    if (hasTransitioned) return;
    hasTransitioned = true;

    elements.focusOverlay.style.opacity = '0';
    setTimeout(() => elements.focusOverlay.style.display = 'none', 1800);
    
    elements.heroGuide.classList.remove('hidden');
    elements.heroGuide.style.left = 'calc(50% - 250px)';

    await cinematicDelay(4800);

    elements.vaultWheel.style.transform = 'rotate(1440deg)';
    await cinematicDelay(2400);
    
    elements.vaultDoor.style.transform = 'rotateY(-112deg)';
    elements.vaultGlow.style.opacity = '1';

    await cinematicDelay(3500);

    await transitionScene(elements.sceneLocked, elements.sceneIntro);
    await runNarrativeEngine(elements.introText, NARRATIVE_PHRASES);
    
    await transitionScene(elements.sceneIntro, elements.sceneOverview);
    revealMosaicTiles();
  });

  /**
   * 5. SCENE CORE
   */
  async function transitionScene(from, to) {
    if (from) {
      from.classList.remove('visible');
      await cinematicDelay(1800);
      from.classList.remove('active');
    }
    if (to) {
      to.classList.add('active');
      void to.offsetWidth;
      to.classList.add('visible');
      await cinematicDelay(1400);
    }
  }

  async function runNarrativeEngine(container, textArray) {
    for (const phrase of textArray) {
      container.innerText = "";
      for (const char of phrase) {
        container.innerText += char;
        await cinematicDelay(55);
      }
      await cinematicDelay(3200);
      if (textArray.indexOf(phrase) < textArray.length - 1) {
        for (let i = phrase.length; i >= 0; i--) {
          container.innerText = phrase.slice(0, i);
          await cinematicDelay(18);
        }
      }
    }
  }

  function createMosaicTile(data, index) {
    const tile = document.createElement('div');
    tile.className = 'mood-tile';
    if (data.type === 'visual') {
      tile.innerHTML = `<img src="${data.url}" alt="Memory" loading="lazy">`;
    } else {
      tile.style.background = "linear-gradient(135deg, #1d0a21, #05010a)";
      tile.innerHTML = `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--accent-color); font-family:var(--font-cursive); font-size:1.5rem; text-align:center; padding:2rem;"><span>Our Heart</span></div>`;
    }
    tile.addEventListener('click', () => openGalleryAt(index));
    return tile;
  }

  function createGallerySlide(data, index) {
    const slide = document.createElement('div');
    slide.className = 'memory-slide';
    if (data.type === 'letter') {
      slide.innerHTML = `<div class="envelope-slide"><p class="letter-text">${ETERNAL_LETTER.content}</p><div class="wax-seal">${ETERNAL_LETTER.seal}</div></div>`;
    } else {
      slide.innerHTML = `<div class="slide-inner"><img src="${data.url}" alt="Memory"></div>`;
    }
    return slide;
  }

  async function openGalleryAt(index) {
    isGalleryActive = true;
    await transitionScene(elements.sceneOverview, elements.sceneGallery);
    const slides = document.querySelectorAll('.memory-slide');
    const target = slides[index];
    if (target) {
      const scrollTarget = target.offsetLeft - (elements.galleryTrack.offsetWidth / 2) + (target.offsetWidth / 2);
      elements.galleryTrack.scrollTo({ left: scrollTarget, behavior: 'instant' });
      initGalleryParallax(slides);
    }
  }

  elements.closeGalleryBtn.addEventListener('click', () => {
    isGalleryActive = false;
    transitionScene(elements.sceneGallery, elements.sceneOverview);
  });

  function initGalleryParallax(slides) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('focused');
        else entry.target.classList.remove('focused');
      });
    }, { root: elements.galleryTrack, threshold: 0.5 });
    slides.forEach(s => observer.observe(s));

    elements.galleryTrack.addEventListener('scroll', () => {
      if (!isGalleryActive) return;
      const trackCenter = elements.galleryTrack.scrollLeft + (elements.galleryTrack.offsetWidth / 2);
      slides.forEach(slide => {
        const slideCenter = slide.offsetLeft + (slide.offsetWidth / 2);
        const distance = slideCenter - trackCenter;
        const normalizedDist = distance / (elements.galleryTrack.offsetWidth / 2);
        const rotY = distance * -0.045;
        const zAxis = Math.abs(normalizedDist) * -240;
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

  function initParticleSystem(canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    const setDimensions = () => { 
      width = canvas.width = window.innerWidth; 
      height = canvas.height = window.innerHeight; 
    };
    window.addEventListener('resize', setDimensions);
    setDimensions();
    for (let i = 0; i < 16; i++) {
      particles.push({
        x: Math.random() * width, y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.15, dy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 550 + 350,
        color: Math.random() > 0.7 ? 'rgba(78, 26, 82, 0.15)' : 'rgba(251, 191, 36, 0.05)'
      });
    }
    function renderLoop() {
      ctx.fillStyle = '#05010a'; ctx.fillRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < -p.radius) p.x = width + p.radius; if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius; if (p.y > height + p.radius) p.y = -p.radius;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color); grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }

  function generateBalloons() {
    const container = document.getElementById('balloon-container');
    for (let i = 0; i < 22; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = (Math.random() * 100) + 'vw';
      b.style.animationDelay = (Math.random() * 40) + 's';
      b.style.background = `rgba(251, 191, 36, ${0.03 + Math.random() * 0.06})`;
      container.appendChild(b);
    }
  }

  function cinematicDelay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
});