// Flashcards data might go use mongo db later idk
const flashcards = [
    { command: "ls", description: "List directory contents" },
    { command: "cd", description: "Change current directory" },
    { command: "pwd", description: "Print working directory" },
    { command: "mkdir", description: "Create a new directory" },
    { command: "rm", description: "Remove files or directories" },
    { command: "cp", description: "Copy files or directories" },
    { command: "mv", description: "Move or rename files or directories" },
    { command: "touch", description: "Create an empty file or update timestamp" },
    { command: "cat", description: "Concatenate and display file contents" },
    { command: "grep", description: "Search text using patterns" },
    { command: "chmod", description: "Change file mode bits" }
];

const commandElement = document.getElementById('command');
const descriptionElement = document.getElementById('description');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipBtn = document.getElementById('flipBtn');
const currentCardElement = document.getElementById('currentCard');
const totalCardsElement = document.getElementById('totalCards');
const progressBar = document.getElementById('progressBar');
const searchInput = document.getElementById('searchInput');
const flipCard = document.querySelector('.flip-card');
const addCardBtn = document.getElementById("addCardBtn");

// Modal Elements
const modalOverlay = document.createElement("div");
modalOverlay.id = "modalOverlay";
modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center";
modalOverlay.innerHTML = `
    <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-bold mb-4">Add New Flashcard</h2>
        <input type="text" id="newCommand" placeholder="Command" class="w-full mb-2 p-2 border rounded">
        <input type="text" id="newDescription" placeholder="Description" class="w-full mb-4 p-2 border rounded">
        <p id="errorMsg" class="text-red-500 text-sm mt-2 hidden">Please fill in both command and description</p>
        <div class="flex justify-between">
            <button id="saveCardBtn" class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button id="cancelCardBtn" class="bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
        </div>
    </div>
`;
document.body.appendChild(modalOverlay);

const saveCardBtn = modalOverlay.querySelector("#saveCardBtn");
const cancelCardBtn = modalOverlay.querySelector("#cancelCardBtn");

// Event Listeners for Add Button
addCardBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
});

cancelCardBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
});

saveCardBtn.addEventListener("click", () => {
    const newCommand = document.getElementById("newCommand").value.trim();
    const newDescription = document.getElementById("newDescription").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (newCommand && newDescription) {
        flashcards.push({ command: newCommand, description: newDescription });
        errorMsg.classList.add("hidden");
        modalOverlay.classList.add("hidden");
        document.getElementById("newCommand").value = "";
        document.getElementById("newDescription").value = "";
    } else {
        errorMsg.textContent = "Please fill in both command and description";
        errorMsg.classList.remove("hidden");
    }
});

let currentCardIndex = 0;
let filteredCards = flashcards;

// Update card display
function updateCard() {
    if (filteredCards.length === 0) {
        commandElement.textContent = 'No results';
        descriptionElement.textContent = 'No matching commands found';
        return;
    }

    const card = filteredCards[currentCardIndex];
    commandElement.textContent = card.command;
    descriptionElement.textContent = card.description;
    
    // Reset flip state
    flipCard.classList.remove('flipped');
    
    // card counter and progress bar
    currentCardElement.textContent = currentCardIndex + 1;
    totalCardsElement.textContent = filteredCards.length;
    progressBar.style.width = `${((currentCardIndex + 1) / filteredCards.length) * 100}%`;
}

// Event listeners for navigation
prevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + filteredCards.length) % filteredCards.length;
    updateCard();
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % filteredCards.length;
    updateCard();
});

// Flip card function
flipBtn.addEventListener('click', () => {
    flipCard.classList.toggle('flipped');
});

// Search function
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filteredCards = flashcards.filter(card => 
        card.command.toLowerCase().startsWith(searchTerm)
    );
    
    currentCardIndex = 0;
    updateCard();
});

// Add Card Function
addCardBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});


// Initial setup
totalCardsElement.textContent = flashcards.length;
updateCard();