const flags = [
  "https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/59/Flag_of_Lebanon.svg",
  "https://www.ubuy.com.lb/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTExOE9PTG9VLUwuX0FDX1NMMTAyNF8uanBn.jpg",
  "https://www.ubuy.com.lb/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTExOE9PTG9VLUwuX0FDX1NMMTAyNF8uanBn.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/1200px-Flag_of_Morocco.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/1200px-Flag_of_Morocco.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg",
  "https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg",
  "https://m.media-amazon.com/images/I/510F3M5LpoL._AC_SL1200_.jpg",
  "https://m.media-amazon.com/images/I/510F3M5LpoL._AC_SL1200_.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png",
];

let firstCard = null;
let secondCard = null;
let score = 0;
let time = 30;
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

if (!gameContainer || !timerElement || !scoreElement) {
  console.error("Missing essential game elements.");
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(flag) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="front"></div>
    <div class="back"><img src="${flag}" alt="Flag" style="width: 100%; height: 100%;"></div>
  `;


  card.addEventListener("click", () => {
    if (card.classList.contains("flipped") || secondCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  });

  return card;
}

function checkMatch() {
  const firstFlag = firstCard.querySelector(".back img").src;
  const secondFlag = secondCard.querySelector(".back img").src;

  if (firstFlag === secondFlag) {
    score += 10;
    scoreElement.textContent = `Score: ${score}`;
    firstCard = null;
    secondCard = null;
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard = null;
      secondCard = null;
    }, 1000);
  }
}

function startGame() {
  shuffle(flags);

  flags.forEach((flag) => {
    const card = createCard(flag);
    gameContainer.appendChild(card);
  });

  const timerInterval = setInterval(() => {
    time--;
    timerElement.textContent = `Time: ${time}`;

    if (time === 0) {
      clearInterval(timerInterval);
      alert(`Game Over! Your score is ${score}`);
      location.reload();
    }
  }, 1000);
}
startGame();
