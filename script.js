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
  "https://ik.imagekit.io/kwujelxax/IMG-20260213-WA0013.jpg",
  "https://ik.imagekit.io/kwujelxax/New%20Folder/IMG-20260213-WA0019.jpg",
  "https://ik.imagekit.io/kwujelxax/New%20Folder/IMG-20260213-WA0037.jpg",
  "https://ik.imagekit.io/kwujelxax/New%20Folder/IMG-20260213-WA0041.jpg",
  "https://ik.imagekit.io/kwujelxax/New%20Folder/IMG-20260213-WA0042.jpg",
  "https://ik.imagekit.io/kwujelxax/New%20Folder/IMG-20260213-WA0017.jpg",
];

const ETERNAL_LETTER = {
  content: "Happy Birthday, my love. There’s something about today that makes me pause a little longer. You are the most beautiful chapter in my story, and I never want this book to end. Thank you for your kindness, your laughter, and for loving me exactly as I am. May today be as extraordinary as you make my life feel every single day. Always and forever.",
  seal: "❤"
};

document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    loader: document.getElementById('scene-loading'),
    progressBar: document.getElementById('loader-progress'),
    loaderMsg: document.getElementById('loader-message'),
    sceneLocked: document.getElementById('scene-locked'),
    sceneIntro: document.getElementById('scene-intro'),
    sceneStory: document.getElementById('scene-story'),
    sceneMeaning: document.getElementById('scene-meaning'),
    sceneHonest: document.getElementById('scene-honest'),
    sceneOverview: document.getElementById('scene-overview'),
    sceneGallery: document.getElementById('scene-gallery'),
    sceneDoubt: document.getElementById('scene-doubt'),
    vaultDoor: document.getElementById('vault-door'),
    vaultWheel: document.getElementById('vault-wheel'),
    vaultGlow: document.getElementById('vault-glow'),
    focusOverlay: document.getElementById('focus-overlay'),
    heroGuide: document.getElementById('hero-character'),
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

  async function materializeAssets() {
    elements.loaderMsg.innerText = "Consulting the stars...";
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Write 3 short, poetic birthday phrases under 10 words. No hashtags.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      dynamicPhrases = text.split('\n').filter(l => l.trim().length > 3).slice(0, 3);
    } catch (e) {
      dynamicPhrases = [
        "A vault of every reason I love you.",
        "Fragments of light, and our shared time.",
        "Happy Birthday, my beautiful soul."
      ];
    }
  }

  async function transitionScene(from, to) {
    if (from) {
      from.classList.remove('visible');
      await cinematicDelay(800);
      from.classList.remove('active');
    }
    if (to) {
      to.classList.add('active');
      // Force reflow
      void to.offsetWidth;
      to.classList.add('visible');
      await cinematicDelay(800);
    }
  }

  async function runNarrativeEngine(container, textArray) {
    for (const phrase of textArray) {
      container.textContent = ""; 
      const chars = Array.from(phrase.trim());
      for (let i = 0; i < chars.length; i++) {
        container.textContent += chars[i];
        await cinematicDelay(65);
      }
      await cinematicDelay(2500);
      if (textArray.indexOf(phrase) < textArray.length - 1) {
        for (let i = phrase.length; i >= 0; i--) {
          container.textContent = phrase.slice(0, i);
          await cinematicDelay(20);
        }
      }
    }
  }

  // --- VAULT UNLOCK LOGIC ---
  elements.focusOverlay.addEventListener('click', async () => {
    if (hasTransitioned) return;
    hasTransitioned = true;

    // 1. Hide the prompt
    elements.focusOverlay.style.opacity = '0';
    elements.focusOverlay.style.pointerEvents = 'none';

    // 2. Spin the wheel
    if (elements.vaultWheel) {
        elements.vaultWheel.style.transition = "transform 2s cubic-bezier(0.45, 0.05, 0.55, 0.95)";
        elements.vaultWheel.style.transform = 'rotate(1080deg)';
    }

    await cinematicDelay(2000);

    // 3. Swing the door
    if (elements.vaultDoor) {
        elements.vaultDoor.style.transition = "transform 1.5s ease-in-out";
        elements.vaultDoor.style.transform = 'rotateY(-110deg)';
    }
    if (elements.vaultGlow) elements.vaultGlow.style.opacity = '1';

    await cinematicDelay(2000);

    // 4. Transition to Intro
    await transitionScene(elements.sceneLocked, elements.sceneIntro);
    await runNarrativeEngine(elements.introText, dynamicPhrases);
    await transitionScene(elements.sceneIntro, elements.sceneStory);
  });

  // --- NAVIGATION ---
  if(elements.sceneStory) elements.sceneStory.onclick = () => transitionScene(elements.sceneStory, elements.sceneMeaning);
  if(elements.sceneMeaning) elements.sceneMeaning.onclick = () => transitionScene(elements.sceneMeaning, elements.sceneHonest);
  if(elements.sceneHonest) elements.sceneHonest.onclick = () => {
    transitionScene(elements.sceneHonest, elements.sceneOverview);
    revealMosaicTiles();
  };

  // --- CONTENT GENERATION ---
  function createMosaicTile(data, index) {
    const tile = document.createElement('div');
    tile.className = 'mood-tile';
    if (data.type === 'visual') {
      tile.innerHTML = `<img src="${data.url}" loading="lazy">`;
    } else {
      tile.style.background = "linear-gradient(45deg, #ff6b6b, #f093fb)";
      tile.innerHTML = `<div class="letter-tile"><span>💌 Letter</span></div>`;
    }
    tile.onclick = () => openGalleryAt(index);
    return tile;
  }

  function createGallerySlide(data, index) {
    const slide = document.createElement('div');
    slide.className = 'memory-slide';
    if (data.type === 'letter') {
      slide.innerHTML = `<div class="mla-letter"><p>${ETERNAL_LETTER.content}</p><div class="wax-seal">${ETERNAL_LETTER.seal}</div></div>`;
    } else {
      slide.innerHTML = `<div class="slide-inner"><img src="${data.url}"></div>`;
    }
    return slide;
  }

  async function openGalleryAt(index) {
    isGalleryActive = true;
    await transitionScene(elements.sceneOverview, elements.sceneGallery);
    const slides = document.querySelectorAll('.memory-slide');
    if (slides[index]) {
      const track = elements.galleryTrack;
      const targetPos = slides[index].offsetLeft - (track.offsetWidth / 2) + (slides[index].offsetWidth / 2);
      track.scrollTo({ left: targetPos, behavior: 'smooth' });
    }
  }

  elements.closeGalleryBtn.onclick = () => {
    isGalleryActive = false;
    transitionScene(elements.sceneGallery, elements.sceneDoubt);
  };

  function revealMosaicTiles() {
    document.querySelectorAll('.mood-tile').forEach((t, i) => {
      setTimeout(() => t.classList.add('spill-active'), i * 100);
    });
  }

  // --- AMBIENT ---
  function initParticleSystem(canvas) {
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth, h = canvas.height = window.innerHeight;
    const particles = Array.from({length: 80}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      s: Math.random() * 2, v: Math.random() * 0.5
    }));
    function render() {
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI*2); ctx.fill();
        p.y -= p.v; if(p.y < 0) p.y = h;
      });
      requestAnimationFrame(render);
    }
    render();
  }

  function generateBalloons() {
    const container = document.getElementById('balloon-container');
    if(!container) return;
    for(let i=0; i<15; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = Math.random()*100 + 'vw';
      b.style.animationDelay = Math.random()*10 + 's';
      container.appendChild(b);
    }
  }

  async function initApp() {
    const assembledContent = MEMORY_REPOSITORY.map(url => ({ type: 'visual', url }));
    assembledContent.push({ type: 'letter' });
    assembledContent.forEach((d, i) => {
      elements.moodCollage.appendChild(createMosaicTile(d, i));
      elements.galleryTrack.appendChild(createGallerySlide(d, i));
    });

    let progress = 0;
    const loaderInt = setInterval(() => {
      progress += 5;
      if(elements.progressBar) elements.progressBar.style.width = progress + '%';
      if(progress >= 100) clearInterval(loaderInt);
    }, 100);

    await materializeAssets();
    setTimeout(() => transitionScene(elements.loader, elements.sceneLocked), 2000);
  }

  initApp();
});

function cinematicDelay(ms) { return new Promise(res => setTimeout(res, ms)); }
