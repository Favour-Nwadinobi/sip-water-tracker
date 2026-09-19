const STORAGE_KEY = "sip-water-tracker-v1";
const DEFAULT_GOAL = 2000;
const GLASS_SIZE = 250;

const els = {
  greeting: document.querySelector("#greeting"),
  progressRing: document.querySelector("#progressRing"),
  percentage: document.querySelector("#percentage"),
  currentAmount: document.querySelector("#currentAmount"),
  goalAmount: document.querySelector("#goalAmount"),
  glassCount: document.querySelector("#glassCount"),
  glasses: document.querySelector("#glasses"),
  statusText: document.querySelector("#statusText"),
  undoButton: document.querySelector("#undoButton"),
  customButton: document.querySelector("#customButton"),
  customDialog: document.querySelector("#customDialog"),
  customForm: document.querySelector("#customForm"),
  customAmount: document.querySelector("#customAmount"),
  customError: document.querySelector("#customError"),
  goalButton: document.querySelector("#goalButton"),
  goalDialog: document.querySelector("#goalDialog"),
  goalForm: document.querySelector("#goalForm"),
  newGoal: document.querySelector("#newGoal"),
  goalError: document.querySelector("#goalError")
};

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return { date: todayKey(), goal: DEFAULT_GOAL, entries: [] };
    if (saved.date !== todayKey()) return { date: todayKey(), goal: saved.goal || DEFAULT_GOAL, entries: [] };
    return { date: todayKey(), goal: saved.goal || DEFAULT_GOAL, entries: Array.isArray(saved.entries) ? saved.entries : [] };
  } catch {
    return { date: todayKey(), goal: DEFAULT_GOAL, entries: [] };
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function totalIntake() {
  return state.entries.reduce((sum, entry) => sum + entry.amount, 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

function setGreeting() {
  const hour = new Date().getHours();
  els.greeting.textContent = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

function renderGlasses(total) {
  const glassGoal = Math.max(1, Math.ceil(state.goal / GLASS_SIZE));
  const filled = Math.min(glassGoal, Math.floor(total / GLASS_SIZE));
  els.glasses.innerHTML = "";
  els.glasses.style.gridTemplateColumns = `repeat(${Math.min(glassGoal, 8)}, 1fr)`;
  for (let i = 0; i < glassGoal; i++) {
    const glass = document.createElement("span");
    glass.className = `glass${i < filled ? " filled" : ""}`;
    glass.setAttribute("aria-hidden", "true");
    els.glasses.appendChild(glass);
  }
  els.glassCount.textContent = `${filled} of ${glassGoal}`;
}

function render() {
  const total = totalIntake();
  const rawPercent = state.goal > 0 ? Math.round((total / state.goal) * 100) : 0;
  const visualPercent = Math.min(rawPercent, 100);
  const remaining = Math.max(state.goal - total, 0);

  els.currentAmount.textContent = formatNumber(total);
  els.goalAmount.textContent = formatNumber(state.goal);
  els.percentage.textContent = `${rawPercent}%`;
  els.progressRing.style.setProperty("--progress", `${visualPercent * 3.6}deg`);
  els.progressRing.setAttribute("aria-valuenow", String(visualPercent));
  els.undoButton.disabled = state.entries.length === 0;
  renderGlasses(total);

  if (total === 0) {
    els.statusText.textContent = `${formatNumber(state.goal)} ml left to reach your goal`;
  } else if (total < state.goal) {
    els.statusText.textContent = `${formatNumber(remaining)} ml left — keep sipping!`;
  } else if (total === state.goal) {
    els.statusText.textContent = "Goal reached! Nice work today 🎉";
  } else {
    els.statusText.textContent = `${formatNumber(total - state.goal)} ml above your goal — goal reached 🎉`;
  }
}

function addWater(amount) {
  if (!Number.isFinite(amount) || amount <= 0) return;
  state.entries.push({ amount, time: new Date().toISOString() });
  saveState();
  render();
}

document.querySelectorAll("[data-amount]").forEach((button) => {
  button.addEventListener("click", () => addWater(Number(button.dataset.amount)));
});

els.undoButton.addEventListener("click", () => {
  state.entries.pop();
  saveState();
  render();
});

els.customButton.addEventListener("click", () => {
  els.customError.textContent = "";
  els.customAmount.value = "";
  els.customDialog.showModal();
  setTimeout(() => els.customAmount.focus(), 50);
});

els.customForm.addEventListener("submit", (event) => {
  const amount = Number(els.customAmount.value);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 5000) {
    event.preventDefault();
    els.customError.textContent = "Enter an amount between 1 ml and 5,000 ml.";
    return;
  }
  addWater(amount);
});

els.goalButton.addEventListener("click", () => {
  els.goalError.textContent = "";
  els.newGoal.value = state.goal;
  els.goalDialog.showModal();
  setTimeout(() => els.newGoal.focus(), 50);
});

els.goalForm.addEventListener("submit", (event) => {
  const goal = Number(els.newGoal.value);
  if (!Number.isFinite(goal) || goal < 250 || goal > 10000) {
    event.preventDefault();
    els.goalError.textContent = "Set a goal between 250 ml and 10,000 ml.";
    return;
  }
  state.goal = goal;
  saveState();
  render();
});

setGreeting();
render();
