# Sip — Daily Water Tracker 💧

Sip is a small daily water-tracking web app built as a Ship Log pet project. It helps users set a daily hydration goal, quickly log water, and see how close they are to reaching their goal.

## Who it is for

Sip is for anyone who wants a quick and simple way to keep track of daily water intake without using a complicated health or fitness app.

## Problem it solves

During a busy day, it is easy to forget how much water you have already had. Sip provides a simple visual tracker so users can log each drink and immediately understand their progress.

## Features

- Set and update a daily water goal
- See current water intake and percentage progress
- Quick-add 250 ml or 500 ml
- Add a custom water amount
- Visual glass tracker
- Undo the most recent entry
- Save progress with browser `localStorage`
- Automatically reset water entries when a new day begins while keeping the user's goal
- Responsive two-column desktop layout that stacks cleanly on mobile
- Personalized time-based greeting
- Motivational quote banner with a custom illustration
- Handles progress above 100% without breaking the UI

## Technologies and tools

- HTML5
- CSS3
- JavaScript
- Browser localStorage

No framework, database, authentication, API, or backend is required for V1.

## Run the project

The simplest option is to open `index.html` in a browser.

For local development, you can also serve the folder with any static server, for example VS Code Live Server.

## Project structure

```text
sip-water-tracker/
├── index.html
├── style.css
├── script.js
├── README.md
└── journal.md
```

## Important decisions

The first version is intentionally small. I chose plain HTML, CSS, and JavaScript so I could focus on the product interaction and ship quickly. `localStorage` is enough for this version because the app only needs to remember one user's goal and today's entries on their device.

The main experience lives on one screen. Adding water is the primary action, so the 250 ml and 500 ml controls are always visible while custom amounts remain available when needed.

## Edge cases handled

- Zero or negative custom amounts are rejected
- Extremely large custom entries are rejected
- The user can undo an accidental entry
- Refreshing the page keeps today's data
- A new day clears old entries
- Going above the daily goal is allowed and displayed correctly
- An empty day displays correctly at 0%

## Future improvements

Possible future versions could add hydration reminders, streaks, daily history, weekly insights, different container sizes, installable PWA support, and optional cloud sync.
