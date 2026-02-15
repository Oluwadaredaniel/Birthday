import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

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
    introText: document.getElementById('intro-text'),
    moodCollage: document.getElementById('mood-collage'),
    horizontalTrack: document.getElementById('horizontal-track'),
    closeGallery: document.getElementById('close-gallery'),
    heartBtn: document.getElementById('heart-btn'),
    backToGallery: document.getElementById('back-to-gallery'),
    mainCanvas: document.getElementById('ambient-canvas'),
    globalNext: document.getElementById('next-btn')
  };

  let hasTransitioned = false;
  let currentSceneIndex = 0;
  let dynamicPhrases = [];

  const storyFlow = [
    elements.sceneStory,
    elements.sceneMeaning,
    elements.sceneHonest,
    elements.sceneOverview,
    elements.sceneDoubt
  ];

  initParticleSystem(elements.mainCanvas);
  generateBalloons();

  if (elements.heartBtn) {
    elements.heartBtn.onclick = () => {
      elements.heartBtn.style.transform = "scale(1.6) rotate(15deg)";
      setTimeout(() => elements.heartBtn.style.transform = "scale(1)", 300);
    };
  }

  if (elements.backToGallery) {
    elements.backToGallery.onclick = async () => {
      await transitionScene(elements.sceneDoubt, elements.sceneOverview);
      currentSceneIndex = 3;
      toggleNextBtn(true);
    };
  }

  // ✅ FIXED HORIZONTAL SCROLL (desktop + mobile)
  if (elements.horizontalTrack) {

    const track = elements.horizontalTrack;

    // wheel scroll fix
    track.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // mobile swipe scroll
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('touchstart', e => {
      isDown = true;
      startX = e.touches[0].pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('touchmove', e => {
      if (!isDown) return;
      const x = e.touches[0].pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });

    track.addEventListener('touchend', () => isDown = false);
  }

  if (elements.closeGallery) {
    elements.closeGallery.onclick = () => {
      transitionScene(elements.sceneGallery, elements.sceneOverview);
      toggleNextBtn(true);
    };
  }

  const toggleNextBtn = (show) => {
    if (!elements.globalNext) return;
    if (show) {
      elements.globalNext.style.display = 'flex';
      void elements.globalNext.offsetWidth;
      elements.globalNext.classList.add('visible-btn');
    } else {
      elements.globalNext.classList.remove('visible-btn');
      setTimeout(() => {
        if (!elements.globalNext.classList.contains('visible-btn')) {
          elements.globalNext.style.display = 'none';
        }
      }, 600);
    }
  };

  async function transitionScene(from, to) {
    if (from) {
      from.classList.remove('visible');
      await cinematicDelay(800);
      from.classList.remove('active');
      from.style.display = 'none';
    }
    if (to) {
      to.style.display = 'flex';
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
    await transitionScene(elements.sceneIntro, elements.sceneStory);
    toggleNextBtn(true);
  };

  if (elements.globalNext) {
    elements.globalNext.addEventListener('click', async (e) => {
      e.preventDefault();
      if (currentSceneIndex < storyFlow.length - 1) {
        const from = storyFlow[currentSceneIndex];
        currentSceneIndex++;
        const to = storyFlow[currentSceneIndex];

        toggleNextBtn(false);
        await transitionScene(from, to);

        if (to === elements.sceneOverview) revealMosaicTiles();

        if (currentSceneIndex < storyFlow.length - 1) {
          toggleNextBtn(true);
        }
      }
    });
  }

  function createMosaicTile(url) {
    const tile = document.createElement('div');
    tile.className = 'mood-tile';
    tile.innerHTML = `<img src="${url}" loading="lazy">`;

    tile.onclick = () => {
      toggleNextBtn(false);
      transitionScene(elements.sceneOverview, elements.sceneGallery);

      const targetImg = [...elements.horizontalTrack.querySelectorAll('img')]
        .find(img => img.src === url);

      if (targetImg) targetImg.parentElement.scrollIntoView();
    };

    return tile;
  }

  function revealMosaicTiles() {
    if (elements.horizontalTrack && elements.horizontalTrack.children.length === 0) {
      MEMORY_REPOSITORY.forEach(url => {
        const slide = document.createElement('div');
        slide.className = 'horizontal-item';
        slide.innerHTML = `<img src="${url}">`;
        elements.horizontalTrack.appendChild(slide);
      });
    }

    document.querySelectorAll('.mood-tile').forEach((t, i) => {
      setTimeout(() => t.classList.add('spill-active'), i * 100);
    });
  }

  function initParticleSystem(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      s: Math.random() * 2,
      v: Math.random() * 0.5
    }));

    function render() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.v;
        if (p.y < 0) p.y = h;
      });
      requestAnimationFrame(render);
    }

    render();
  }

  function generateBalloons() {
    const container = document.getElementById('balloon-container');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = Math.random() * 100 + 'vw';
      b.style.animationDelay = Math.random() * 10 + 's';
      container.appendChild(b);
    }
  }

  async function materializeAssets() {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "Write 2 short, poetic birthday phrases under 10 words for Janet. No hashtags.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      dynamicPhrases = text.split('\n').filter(l => l.trim().length > 3).slice(0, 2);
    } catch {
      dynamicPhrases = [
        "A vault of every reason I love you.",
        "Happy Birthday, Janet."
      ];
    }
  }

  async function initApp() {
    if (elements.moodCollage) {
      MEMORY_REPOSITORY.forEach(url => {
        elements.moodCollage.appendChild(createMosaicTile(url));
      });
    }

    let progress = 0;

    const loaderInt = setInterval(() => {
      progress += 5;
      if (elements.progressBar)
        elements.progressBar.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(loaderInt);
        setTimeout(async () => {
          await transitionScene(elements.loader, elements.sceneLocked);
          setTimeout(() => {
            if (!hasTransitioned) unlockVaultAction();
          }, 3000);
        }, 1000);
      }
    }, 100);

    materializeAssets();
  }

  initApp();
});

function cinematicDelay(ms) {
  return new Promise(res => setTimeout(res, ms));
}
