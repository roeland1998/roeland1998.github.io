// 1. DE VARIABELEN (De opslagbakjes)
let timeLeft = 25 * 60; // De tijd in seconden
let timerId = null; // De ID van de lopende timer
let isFocusMode = true; // Zitten we in Focus of Relax?
let currentTheme = localStorage.getItem("selectedTheme") || "theme-1"; // Onthoud thema
const totalThemes = 12; // Hoeveel thema's heb je in totaal?

// 2. DE START/PAUZE LOGICA
function startTimer() {
  if (timerId !== null) {
    // Als hij al loopt -> Stop hem (Pauze)
    clearInterval(timerId);
    timerId = null;
    return;
  }

  // Als hij niet loopt -> Start hem
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      switchMode(); // Wissel tussen Focus en Relax
      startTimer(); // Start de nieuwe timer direct
    }
  }, 1000);
}

// 3. DE DISPLAY UPDATE (De tijd op het scherm zetten)
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  document.getElementById("timer").textContent = displayString;
}

// 4. DE FOCUS/RELAX WISSEL
function switchMode() {
  isFocusMode = !isFocusMode;
  const statusElement = document.getElementById("status");

  if (isFocusMode) {
    timeLeft = 25 * 60;
    statusElement.textContent = "Focus";
  } else {
    timeLeft = 5 * 60;
    statusElement.textContent = "Relax";
  }

  // Update het thema (zodat de pause-mode kleuren laden)
  setTheme(currentTheme);
  updateDisplay();
}

// 5. DE RANDOM THEMA KIEZER
function setRandomTheme() {
  let newThemeNumber;
  const currentNumber = parseInt(currentTheme.replace("theme-", ""));

  // Kies een nieuw nummer dat niet hetzelfde is als de huidige
  do {
    newThemeNumber = Math.floor(Math.random() * totalThemes) + 1;
  } while (newThemeNumber === currentNumber);

  setTheme("theme-" + newThemeNumber);
}

// 6. HET THEMA ECHT TOEPASSEN
function setTheme(themeName) {
  currentTheme = themeName;
  localStorage.setItem("selectedTheme", themeName);

  document.body.className = ""; // Maak alle classes leeg
  document.body.classList.add(themeName); // Voeg thema toe (bijv theme-3)

  // Als we in pauze zitten, voeg de extra kleur-omdraai class toe
  if (!isFocusMode) {
    document.body.classList.add("pause-mode");
  }
}

// 7. OPSTARTEN
// Zorg dat bij het openen direct het juiste thema en de tijd klaarstaan
setTheme(currentTheme);
updateDisplay();
