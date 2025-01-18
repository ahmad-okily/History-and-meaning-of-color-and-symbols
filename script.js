const flags = [
  // Array of flag image URLs (duplicates for matching pairs)
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

let firstCard = null; // Stores the first selected card
let secondCard = null; // Stores the second selected card
let score = 0; // Tracks the player's score
let time = 30; // Timer value in seconds
const timerElement = document.getElementById("timer"); // Timer display element
const scoreElement = document.getElementById("score"); // Score display element
const gameContainer = document.getElementById("game-container"); // Game container for the cards

// Check if essential game elements exist, and log an error if they are missing
if (!gameContainer || !timerElement || !scoreElement) {
  console.error("Missing essential game elements.");
}

// Function to shuffle an array in place
function shuffle(array) {
  // Iterate through the array and swap elements randomly
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Function to create a card element with a flag image
function createCard(flag) {
  const card = document.createElement("div"); // Create a card container
  card.classList.add("card"); // Add card CSS class
  card.innerHTML = `
    <div class="front"></div>
    <div class="back"><img src="${flag}" alt="Flag" style="width: 100%; height: 100%;"></div>
  `;

  // Add a click event listener to handle card flipping
  card.addEventListener("click", () => {
    if (card.classList.contains("flipped") || secondCard) return; // Prevent flipping more than 2 cards

    card.classList.add("flipped"); // Flip the card

    if (!firstCard) {
      // If no card is selected yet, store this card as the first card
      firstCard = card;
    } else {
      // If one card is already selected, store this as the second card and check for a match
      secondCard = card;
      checkMatch();
    }
  });

  return card; // Return the created card
}

// Function to check if the two selected cards match
function checkMatch() {
  const firstFlag = firstCard.querySelector(".back img").src; // Get the flag image of the first card
  const secondFlag = secondCard.querySelector(".back img").src; // Get the flag image of the second card

  if (firstFlag === secondFlag) {
    // If the flags match
    score += 10; // Increase the score
    scoreElement.textContent = `Score: ${score}`; // Update the score display
    firstCard = null; // Reset the first card
    secondCard = null; // Reset the second card

    // Check if the game is complete
    if (score === 60) {
      showFireworks(); // Show fireworks when the game is complete
      setTimeout(() => {
        alert("Congratulations! You've completed the game!"); // Show a success alert
        location.reload(); // Reload the page to restart the game
      }, 1000);
    }
  } else {
    // If the flags don't match
    setTimeout(() => {
      firstCard.classList.remove("flipped"); // Flip the first card back
      secondCard.classList.remove("flipped"); // Flip the second card back
      firstCard = null; // Reset the first card
      secondCard = null; // Reset the second card
    }, 1000); // Wait 1 second before flipping the cards back
  }
}

// Function to display fireworks when the game is completed
function showFireworks() {
  const fireworksContainer = document.createElement("div"); // Create a container for fireworks
  fireworksContainer.id = "fireworks-container"; // Set an ID for styling
  document.body.appendChild(fireworksContainer); // Add the container to the page

  // Style the fireworks container
  fireworksContainer.style.position = "fixed";
  fireworksContainer.style.top = 0;
  fireworksContainer.style.left = 0;
  fireworksContainer.style.width = "100%";
  fireworksContainer.style.height = "100%";
  fireworksContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  fireworksContainer.style.display = "flex";
  fireworksContainer.style.justifyContent = "center";
  fireworksContainer.style.alignItems = "center";
  fireworksContainer.style.zIndex = 1000;

  const firework = document.createElement("div"); // Create a firework effect
  firework.textContent = "🎆🎇"; // Use emojis for the fireworks
  firework.style.fontSize = "4rem";
  firework.style.animation = "zoomIn 2s ease-out infinite"; // Add animation to the fireworks
  fireworksContainer.appendChild(firework); // Add the firework to the container

  setTimeout(() => {
    fireworksContainer.remove(); // Remove the fireworks container after 3 seconds
  }, 3000);
}

// Function to start the game
function startGame() {
  shuffle(flags); // Shuffle the flags array

  flags.forEach((flag) => {
    const card = createCard(flag); // Create a card for each flag
    gameContainer.appendChild(card); // Add the card to the game container
  });

  const timerInterval = setInterval(() => {
    time--; // Decrease the timer
    timerElement.textContent = `Time: ${time}`; // Update the timer display

    if (time === 0) {
      // If the timer reaches 0
      clearInterval(timerInterval); // Stop the timer
      alert(`Game Over! Your score is ${score}`); // Show a game-over alert
      location.reload(); // Reload the page to restart the game
    }
  }, 1000); // Run every second
}

startGame(); // Start the game
