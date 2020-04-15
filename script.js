const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById(
  'final-message-reveal-word'
);

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'ape'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

/**Show hidden word */
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  console.log(wordEl.innerText, innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
}

// Show notificaiton
function showNotifcation() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);
}

// Keydown letter press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotifcation();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotifcation();
      }
    }
  }
});

displayWord();
