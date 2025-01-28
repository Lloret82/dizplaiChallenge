# Dizplai Coding Challenge

Built using Vite/React for the frontend and Node.js with SQLite for the backend. The database is already set up, so you just need to run the code.

---

## Features

- **Vote on Polls**: Pick an option and submit your vote.
- **See Results**: After voting, see the percentage of votes for each option.
- **Create New Polls**: Add a new poll with 2 to 7 options.
- **Switch Polls**: Use a dropdown or list to view different polls.
- **Responsive Design**: Works well on desktop, tablet, and mobile.
- **Back to Home**: Click the logo to return to the main screen.
- **View vote details**: Show timestamp for each vote.

---

## How to Run the Project

### 1. Extract the ZIP

Unzip the folder and open the project directory.

### 2. Run the Backend

1. Go to the backend folder:
   Install the required packages:
   npm install
   Start the server:
   npm start
   The backend runs on http://localhost:4000.

Note: The database is already in the code. A default poll will be added when the server runs for the first time.

3. Run the Frontend
   Go to the frontend folder:
   Install the required packages:
   npm install
   Start the development server:
   npm run dev
   The frontend will open at http://localhost:5173.

How It Works

The active poll will be displayed. Select an option and click Submit to vote.
After voting, you’ll see the results as percentages.
Click Create Poll to add a new poll with 2–7 options.
Use the dropdown (or burger menu on mobile) to switch between polls.
Click the logo to return to the main poll screen from the poll results.
Files and What They Do

Backend Structure

server.js: Starts the backend server.
app.js: Sets up API routes and middleware.
routes/polls.js: Contains the API logic for polls and votes.
db.js: Manages the SQLite database and seeds default data if needed.
schema.sql: Defines the database structure.

Frontend Structure

App.jsx: Main file managing the app’s logic and layout.
components/CreatePollModal.jsx: Handles creating new polls.
components/Poll.jsx: Displays the active poll and voting options.
components/PollResults.jsx: Shows results after voting.
components/PollSelector.jsx: Dropdown to switch polls.
index.css: Contains the styling using Tailwind CSS.

Testing

Run the tests with:

npm run test

What’s Tested

Frontend: Checks if the poll renders correctly and if voting works.
Backend: Tests poll creation and voting APIs.

Polls can only have 2 to 7 options.
If no polls exist, a default poll is added automatically.
Clicking the logo in results takes you back to the main screen.

What I Added Beyond the Requirements

Poll List View: You can see and switch between all polls (burger menu on mobile)
Create Poll Button: Added an option to create new polls.
View Votes : show vote option and timestamp of the vote
