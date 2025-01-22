const flashcards = [
    { command: "ls", description: "List directory contents" },
    { command: "cd", description: "Change directory" },
    { command: "pwd", description: "Print working directory" },
    { command: "mkdir", description: "Make directory" },
    { command: "rm", description: "Remove files or directories" },
    { command: "cp", description: "Copy files or directories" },
    { command: "mv", description: "Move/rename files or directories" },
    { command: "cat", description: "Concatenate and display file contents" },
    { command: "grep", description: "Search for patterns in files" },
    { command: "chmod", description: "Change file permissions" }
];

let currentIndex = 0;
const flipCard = document.querySelector('.flip-card');
const commandElement = document.getElementById('command');
const descriptionElement = document.getElementById('description');
const currentCardElement = document.getElementById('currentCard');
const totalCardsElement = document.getElementById('totalCards');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipBtn = document.getElementById('flipBtn');
const progressBar = document.getElementById('progressBar');
const progressBarBack = document.getElementById('progressBarBack');

function updateProgressBar() {
    const progress = ((currentIndex + 1) / flashcards.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBarBack.style.width = `${progress}%`;
}

function updateCard() {
    const card = flashcards[currentIndex];
    commandElement.textContent = card.command;
    descriptionElement.textContent = card.description;
    currentCardElement.textContent = currentIndex + 1;
    totalCardsElement.textContent = flashcards.length;
    flipCard.classList.remove('flipped');
    updateProgressBar();
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    updateCard();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % flashcards.length;
    updateCard();
});

flipBtn.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
});

// Initialize the first card
updateCard();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === ' ') {
        e.preventDefault();
        flipBtn.click();
    }
});