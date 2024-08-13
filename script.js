let counter = 0;
const maxCounter = 150;
const minCounter = 0;
let history = [];
let redoHistory = [];

const counterElement = document.getElementById('counter');
const progressElement = document.getElementById('progress');

function updateProgressBar() {
    const percentage = (counter / maxCounter) * 100;
    progressElement.style.width = percentage + '%';
}

function updateCounter(value) {
    history.push(counter);  // Save the current state for undo
    redoHistory = []; // Clear redo history whenever a new action is performed
    counter = Math.min(Math.max(counter + value, minCounter), maxCounter);
    counterElement.textContent = counter;
    updateProgressBar();
}

document.getElementById('add').addEventListener('click', () => updateCounter(1));
document.getElementById('subtract').addEventListener('click', () => updateCounter(-1));

document.getElementById('undo').addEventListener('click', () => {
    if (history.length > 0) {
        redoHistory.push(counter); // Save the current state for redo
        counter = history.pop();
        counterElement.textContent = counter;
        updateProgressBar();
    }
});

document.getElementById('redo').addEventListener('click', () => {
    if (redoHistory.length > 0) {
        history.push(counter); // Save the current state for undo
        counter = redoHistory.pop();
        counterElement.textContent = counter;
        updateProgressBar();
    }
});

updateProgressBar(); // Initialize progress bar on page load
