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

function getRandomRgba() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = (Math.random() * 0.5 + 0.5).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

const squares = [
    document.getElementById("square1"),
    document.getElementById("square2"),
    document.getElementById("square3"),
    document.getElementById("square4"),
    document.getElementById("square5")
];

const randomColorsBtn = document.getElementById("randomColorsBtn");
const resetColorsBtn = document.getElementById("resetColorsBtn");

randomColorsBtn.addEventListener("click", () => {
    squares.forEach(square => {
        square.style.backgroundColor = getRandomRgba();
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
