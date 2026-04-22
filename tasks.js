
let clickCount = 0;
const phrases = ["Доброе утро!", "Добрый день!", "Добрый вечер!"];
let phraseIndex = 0;

const greetingHeader = document.getElementById("greetingHeader");
const clickCounterBtn = document.getElementById("clickCounterBtn");

clickCounterBtn.addEventListener("click", () => {
    clickCount++;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    greetingHeader.textContent = phrases[phraseIndex];
    clickCounterBtn.textContent = `Кликов: ${clickCount}`;
});


const textBlocks = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
    text3: document.getElementById("text3")
};

const singleButtons = document.querySelectorAll(".toggle-single-btn");
const toggleAllBtn = document.getElementById("toggleAllBtn");

function updateSingleButtonText(paragraphId, button) {
    const isHidden = textBlocks[paragraphId].style.display === "none";
    button.textContent = isHidden ? "Показать" : "Скрыть";
}

function updateToggleAllButton() {
    const allHidden = Object.values(textBlocks).every(p => p.style.display === "none");
    const anyVisible = Object.values(textBlocks).some(p => p.style.display !== "none");
    
    if (allHidden) {
        toggleAllBtn.textContent = "Показать всё";
    } else if (anyVisible) {
        toggleAllBtn.textContent = "Скрыть всё";
    }
}

singleButtons.forEach(button => {
    const targetId = button.getAttribute("data-target");
    const targetParagraph = textBlocks[targetId];
    
    targetParagraph.style.display = "block";
    button.textContent = "Скрыть";
    
    button.addEventListener("click", () => {
        if (targetParagraph.style.display === "none") {
            targetParagraph.style.display = "block";
            button.textContent = "Скрыть";
        } else {
            targetParagraph.style.display = "none";
            button.textContent = "Показать";
        }
        updateToggleAllButton();
    });
});

toggleAllBtn.addEventListener("click", () => {
    const allHidden = Object.values(textBlocks).every(p => p.style.display === "none");
    
    if (allHidden) {
        Object.keys(textBlocks).forEach(id => {
            textBlocks[id].style.display = "block";
        });
        singleButtons.forEach(btn => {
            btn.textContent = "Скрыть";
        });
        toggleAllBtn.textContent = "Скрыть всё";
    } else {
        Object.keys(textBlocks).forEach(id => {
            textBlocks[id].style.display = "none";
        });
        singleButtons.forEach(btn => {
            btn.textContent = "Показать";
        });
        toggleAllBtn.textContent = "Показать всё";
    }
});


const palette = [
    "rgba(255, 107, 107, 0.85)",
    "rgba(78, 205, 196, 0.85)",
    "rgba(69, 183, 209, 0.85)",
    "rgba(150, 206, 180, 0.85)",
    "rgba(255, 234, 167, 0.85)",
    "rgba(221, 160, 221, 0.85)",
    "rgba(243, 156, 18, 0.85)",
    "rgba(231, 76, 60, 0.85)",
    "rgba(46, 204, 113, 0.85)",
    "rgba(155, 89, 182, 0.85)",
    "rgba(26, 188, 156, 0.85)",
    "rgba(230, 126, 34, 0.85)"
];

const squares = [
    document.getElementById("square1"),
    document.getElementById("square2"),
    document.getElementById("square3"),
    document.getElementById("square4"),
    document.getElementById("square5")
];

const randomColorsBtn = document.getElementById("randomColorsBtn");
const resetColorsBtn = document.getElementById("resetColorsBtn");

function getRandomColor() {
    return palette[Math.floor(Math.random() * palette.length)];
}

randomColorsBtn.addEventListener("click", () => {
    squares.forEach(square => {
        square.style.backgroundColor = getRandomColor();
    });
});

resetColorsBtn.addEventListener("click", () => {
    squares.forEach(square => {
        square.style.backgroundColor = "rgba(255, 255, 255, 1)";
    });
});


const stateBox = document.getElementById("stateBox");
const cycleBoxBtn = document.getElementById("cycleBoxBtn");

const states = [
    { remove: ["large", "red", "small", "blue", "medium", "green"], add: [], text: "Стандарт" },
    { remove: ["small", "blue", "medium", "green"], add: ["large", "red"], text: "Большой красный" },
    { remove: ["large", "red", "medium", "green"], add: ["small", "blue"], text: "Маленький синий" },
    { remove: ["large", "red", "small", "blue"], add: ["medium", "green"], text: "Средний зелёный" }
];

let currentStateIndex = 0;

function updateBoxState() {
    const state = states[currentStateIndex];
    
    state.remove.forEach(className => {
        stateBox.classList.remove(className);
    });
    
    state.add.forEach(className => {
        stateBox.classList.add(className);
    });
    
    cycleBoxBtn.textContent = state.text;
}

cycleBoxBtn.addEventListener("click", () => {
    currentStateIndex = (currentStateIndex + 1) % states.length;
    updateBoxState();
});

updateBoxState();
