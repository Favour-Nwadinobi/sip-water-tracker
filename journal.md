# Sip — Project Journal

## Project idea

I wanted to build a small project that I could design, develop, and ship quickly for my Ship Log. I chose a daily water tracker because the idea is simple and useful, but it still gives me enough interaction and state-management logic to practise.

## Goal

Build a clean one-screen experience where a user can see their hydration progress and record water in a few seconds.

## Planning

I intentionally kept V1 small. I did not add authentication, a database, a backend, notifications, or analytics. Those features could make the project larger without improving the main learning goal.

Instead, I focused on the core loop:

1. Set a daily goal.
2. Add water.
3. Update the total and percentage.
4. Show the remaining amount.
5. Save the data locally.

## Features built for V1

- Daily water goal
- Current intake
- Circular progress indicator
- 250 ml and 500 ml quick-add actions
- Custom water amount
- Visual glass tracker
- Undo last entry
- localStorage persistence
- Automatic daily reset
- Responsive interface

## Design decisions

I wanted Sip to feel light, fresh, and calm, so I used an off-white background, blue hydration accents, rounded components, and a simple card-based layout.

The water progress is the visual focus of the screen. Quick-add buttons sit directly below it so the most common action does not require opening another screen.

I also kept settings minimal. The settings button only changes the daily goal because that is the only setting the first version really needs.

## Development approach

I built the project with HTML, CSS, and vanilla JavaScript. This kept setup small and made it possible to focus on the application logic instead of framework configuration.

The application stores three important pieces of information: the current date, the user's daily goal, and an array of water entries. The current intake is calculated from those entries rather than storing a separate total.

Each time the state changes, it is saved to localStorage and the interface is rendered again.

## Edge cases considered

I accounted for users drinking more than their goal, entering invalid custom values, accidentally logging an entry, refreshing the page, opening the app on a new day, and having no entries at all.

For a new day, Sip removes the previous day's water entries but keeps the user's chosen daily goal.

## What I learned

This project gave me practice with state management without a framework, localStorage, input validation, DOM updates, progress calculations, responsive UI, and thinking about product edge cases before adding more features.

It also reinforced that a useful project does not need a large feature set. A small product can still feel complete when its main interaction is clear and polished.

## Ship Log

**Project:** Sip — Daily Water Tracker  
**Type:** Pet project  
**Stack:** HTML, CSS, JavaScript, localStorage  
**Goal:** Design, build, and ship a small useful product quickly.  
**Status:** Shipped 🚀
