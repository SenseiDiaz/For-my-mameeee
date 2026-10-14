const layout = document.querySelector(".memory-layout");
const openButton = document.getElementById("openButton");
const letter = document.getElementById("letter");
const sceneNote = document.getElementById("sceneNote");
const hint = document.getElementById("hint");

const backgroundMusic = document.getElementById("backgroundMusic");

async function playMusic() {
    try {
        await backgroundMusic.play();
    } catch (error) {
        console.log("Tap the page to start the music.");
    }
}

function pauseMusic() {
    backgroundMusic.pause();
}

function setLetterOpen(isOpen) {
  layout.classList.toggle("is-open", isOpen);
  openButton.setAttribute("aria-expanded", String(isOpen));
  letter.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    openButton.innerHTML = 'Close Letter <span>♡</span>';
    sceneNote.textContent = "A little piece of my heart, just for you.";
    hint.textContent = "Take your time reading it ♡";
    burstHearts(9);
    playMusic();
  } else {
    openButton.innerHTML = 'Open Me <span>♡</span>';
    sceneNote.textContent = "There's a little something for you...";
    hint.textContent = "Psst... this is just for you.";
    letter.scrollTop = 0;
    pauseMusic();
  }
}

openButton.addEventListener("click", () => {
  setLetterOpen(!layout.classList.contains("is-open"));
});

// Gentle floating hearts in the background.
const heartContainer = document.querySelector(".floating-hearts");
const heartSymbols = ["♡", "♥", "ღ"];

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.animationDuration = `${7 + Math.random() * 7}s`;
  heart.style.animationDelay = `${Math.random() * 1.5}s`;
  heartContainer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

function burstHearts(amount) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 110);
  }
}

setInterval(createHeart, 1400);
