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
    mainCanvas: document.getElementById('ambient-canvas'),
    // NEW GLOBAL BUTTON
    globalNext: document.getElementById('global-next-btn')
  };

  let hasTransitioned = false;
  let currentSceneIndex = 0;
  let dynamicPhrases = [];

  // Order of scenes for the Next button to cycle through
  const storyFlow = [
    elements.sceneStory,
    elements.sceneMeaning,
    elements.sceneHonest,
    elements.sceneOverview,
    elements.sceneDoubt
  ];

  initParticleSystem(elements.mainCanvas);
  generateBalloons();

  // Helper to show/hide the button safely
  const toggleNextBtn = (show) => {
    if (!elements.globalNext) return;
    if (show) {
      elements.globalNext.classList.remove('hidden');
      setTimeout(() => elements.globalNext.classList.add('visible-btn'), 50);
    } else {
      elements.globalNext.classList.remove('visible-btn');
      setTimeout(() => elements.globalNext.classList.add('hidden'), 300);
    }
  };

  async function transitionScene(from, to) {
    if (from) {
      from.classList.remove('visible');
      await cinematicDelay(800);
      from.classList.remove('active');
    }
    if (to) {
      to.classList.add('active');
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

  const unlockVaultAction = async () => {
    if (hasTransitioned) return;
    hasTransitioned = true;

    if (elements.focusOverlay) {
        elements.focusOverlay.style.opacity = '0';
        elements.focusOverlay.style.pointerEvents = 'none';
        setTimeout(() => elements.focusOverlay.remove(), 400);
    }

    if (elements.vaultWheel) {
        elements.vaultWheel.style.transition = "transform 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95)";
        elements.vaultWheel.style.transform = 'rotate(720deg)';
    }

    await cinematicDelay(1200);

    if (elements.vaultDoor) {
        elements.vaultDoor.style.transition = "transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)";
        elements.vaultDoor.style.transform = 'rotateY(-115deg) translateZ(1px)';
    }
    
    if (elements.vaultGlow) elements.vaultGlow.style.opacity = '1';

    await cinematicDelay(2500);
    await transitionScene(elements.sceneLocked, elements.sceneIntro);
    
    const activePhrases = dynamicPhrases.length > 0 ? dynamicPhrases : [
        "A vault of every reason I love you.",
        "Happy Birthday, Janet."
    ];

    await runNarrativeEngine(elements.introText, activePhrases);
    
    // Switch to first story card and SHOW NEXT BUTTON
    await transitionScene(elements.sceneIntro, elements.sceneStory);
    toggleNextBtn(true);
  };

  // GLOBAL NEXT BUTTON LOGIC
  elements.globalNext.addEventListener('click', async () => {
    if (currentSceneIndex < storyFlow.length - 1) {
      const from = storyFlow[currentSceneIndex];
      currentSceneIndex++;
      const to = storyFlow[currentSceneIndex];

      toggleNextBtn(false); 
      await transitionScene(from, to);

      if (to === elements.sceneOverview) revealMosaicTiles();
      
      // Keep showing button unless it's the very last scene
      if (currentSceneIndex < storyFlow.length - 1) {
        toggleNextBtn(true);
      }
    }
  });

  // Backup Manual Click
  if (elements.focusOverlay) {
    elements.focusOverlay.addEventListener('click', unlockVaultAction);
  }

  function createMosaicTile(data, index) {
    const tile = document.createElement('div');
    tile.className = 'mood-tile';
    if (data.type === 'visual') {
      tile.innerHTML = `<img src="${data.url}" loading="lazy">`;
    } else {
      tile.style.background = "linear-gradient(45deg, #ff6b6b, #f093fb)";
      tile.innerHTML = `<div class="letter-tile"><span>💌 Letter</span></div>`;
    }
    // Mobile gallery can be tricky, so we'll keep the grid as is for now
    return tile;
  }

  function revealMosaicTiles() {
    document.querySelectorAll('.mood-tile').forEach((t, i) => {
      setTimeout(() => t.classList.add('spill-active'), i * 100);
    });
  }

  // Particle and Balloon logic (Omitted for brevity, keep your original functions here)
  function initParticleSystem(canvas) { /* ... same as before ... */ }
  function generateBalloons() { /* ... same as before ... */ }
  async function materializeAssets() { /* ... same as before ... */ }

  async function initApp() {
    const assembledContent = MEMORY_REPOSITORY.map(url => ({ type: 'visual', url }));
    assembledContent.push({ type: 'letter' });
    assembledContent.forEach((d, i) => {
      elements.moodCollage.appendChild(createMosaicTile(d, i));
    });

    let progress = 0;
    const loaderInt = setInterval(() => {
      progress += 5;
      if(elements.progressBar) elements.progressBar.style.width = progress + '%';
      if(progress >= 100) clearInterval(loaderInt);
    }, 100);

    materializeAssets();
    
    setTimeout(async () => {
        await transitionScene(elements.loader, elements.sceneLocked);
        setTimeout(() => { if (!hasTransitioned) unlockVaultAction(); }, 3000);
    }, 2000);
  }

  initApp();
});

function cinematicDelay(ms) { return new Promise(res => setTimeout(res, ms)); }
