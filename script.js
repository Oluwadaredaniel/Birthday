import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

/**
 * ========================================
 * CINEMATIC ENGINE: A STORY OF YOU
 * ========================================
 */

const API_KEY = "AIzaSyB7YStFu75rVaNjMuFw7X00dtJe_1Psj9s";
const genAI = new GoogleGenerativeAI(API_KEY);

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
  let dynamicPhrases = [];

  initParticleSystem(elements.mainCanvas);
  generateBalloons();

  /**
   * 1. ASSET MATERIALIZATION
   */
  async function materializeAssets() {
    elements.loaderMsg.innerText = "Consulting the Gemini stars...";
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Write 3 short, poetic, and cinematic phrases for a birthday 'vault' containing memories of a loved one. Under 10 words each. No hashtags.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      dynamicPhrases = text.split('\n').filter(l => l.trim().length > 3).slice(0, 3);
    } catch (e) {
      dynamicPhrases = [
        "I've been keeping a vault of every reason I love you.",
        "A collection of fragments, of light, and of our shared time.",
        "Happy Birthday, my beautiful soul."
      ];
    }
  }

  /**
   * 2. NARRATIVE ENGINE (Improved Spacing & Indentation)
   */
  async function runNarrativeEngine(container, textArray) {
    for (const phrase of textArray) {
      // Clear container and set to textContent to avoid HTML parsing issues with spaces
      container.textContent = ""; 
      
      // Use Array.from to correctly iterate over string including spaces
      const chars = Array.from(phrase.trim());
      
      for (let i = 0; i < chars.length; i++) {
        container.textContent += chars[i];
        await cinematicDelay(65);
      }
      
      await cinematicDelay(3000);
      
      // Backspace logic - stays consistent with your original loop structure
      if (textArray.indexOf(phrase) < textArray.length - 1) {
        for (let i = phrase.length; i >= 0; i--) {
          container.textContent = phrase.slice(0, i);
          await cinematicDelay(20);
        }
      }
    }
  }

  /**
   * 3. BOOTLOADER
   */
  async function runBootloader() {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 90) progress += 0.5;
      elements.progressBar.style.width = `${progress}%`;
    }, 50);

    await materializeAssets();
    elements.progressBar.style.width = "100%";
    clearInterval(interval);
    setTimeout(() => transitionScene(elements.loader, elements.sceneLocked), 1000);
  }

  elements.focusOverlay.addEventListener('click', async () => {
    if (hasTransitioned) return;
    hasTransitioned = true;
    elements.focusOverlay.style.opacity = '0';
    setTimeout(() => elements.focusOverlay.style.display = 'none', 1000);
    
    if (elements.heroGuide) elements.heroGuide.classList.remove('hidden');

    await cinematicDelay(1000);
    elements.vaultWheel.style.transform = 'rotate(1080deg)';
    await cinematicDelay(2400);
    elements.vaultDoor.style.transform = 'rotateY(-110deg)';
    elements.vaultGlow.style.opacity = '1';
    
    await cinematicDelay(3000);
    await transitionScene(elements.sceneLocked, elements.sceneIntro);
    await runNarrativeEngine(elements.introText, dynamicPhrases);
    await transitionScene(elements.sceneIntro, elements.sceneOverview);
    revealMosaicTiles();
  });

  // Scene Core
  async function transitionScene(from, to) {
    if (from) { from.classList.remove('visible'); await cinematicDelay(1500); from.classList.remove('active'); }
    if (to) { to.classList.add('active'); void to.offsetWidth; to.classList.add('visible'); await cinematicDelay(1000); }
  }

  function createMosaicTile(data, index) {
    const tile = document.createElement('div');
    tile.className = 'mood-tile';
    if (data.type === 'visual') {
      tile.innerHTML = `<img src="${data.url}" loading="lazy">`;
    } else {
      tile.style.background = "linear-gradient(135deg, #1d0a21, #05010a)";
      tile.innerHTML = `<div class="letter-tile"><span>Our Heart</span></div>`;
    }
    tile.addEventListener('click', () => openGalleryAt(index));
    return tile;
  }

  function createGallerySlide(data) {
    const slide = document.createElement('div');
    slide.className = 'memory-slide';
    if (data.type === 'letter') {
      slide.innerHTML = `<div class="envelope-slide"><p class="letter-text">${ETERNAL_LETTER.content}</p><div class="wax-seal">${ETERNAL_LETTER.seal}</div></div>`;
    } else {
      slide.innerHTML = `<div class="slide-inner"><img src="${data.url}"></div>`;
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
      entries.forEach(e => e.target.classList.toggle('focused', e.isIntersecting));
    }, { root: elements.galleryTrack, threshold: 0.5 });
    slides.forEach(s => observer.observe(s));
    
    // Original Parallax logic remains here
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
    document.querySelectorAll('.mood-tile').forEach((t, i) => {
      setTimeout(() => t.classList.add('spill-active'), i * 90);
    });
  }

  function initParticleSystem(canvas) {
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    function render() {
      ctx.fillStyle = '#05010a'; ctx.fillRect(0,0,w,h);
      requestAnimationFrame(render);
    }
    render();
  }

  function generateBalloons() {
    const container = document.getElementById('balloon-container');
    for(let i=0; i<20; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = Math.random()*100 + 'vw';
      b.style.animationDelay = Math.random()*20 + 's';
      container.appendChild(b);
    }
  }

  const assembledContent = MEMORY_REPOSITORY.map(url => ({ type: 'visual', url }));
  assembledContent.push({ type: 'letter' });
  assembledContent.forEach((d, i) => {
    elements.moodCollage.appendChild(createMosaicTile(d, i));
    elements.galleryTrack.appendChild(createGallerySlide(d));
  });

  runBootloader();
});

function cinematicDelay(ms) { return new Promise(res => setTimeout(res, ms)); }
