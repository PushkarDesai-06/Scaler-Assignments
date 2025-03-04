
React API Fetching Assignment
Project: GitHub User Finder
Objective:
 Build a React application that fetches and displays user data from the GitHub API based on user input.
📌 Learning Outcomes
By completing this assignment, you will:
Learn how to fetch data from an API using fetch or axios
Understand useState and useEffect in React
Learn how to handle different states (loading, success, error)
Implement a structured component-based approach

🛠️ Project Setup
Step 1: Initialize the React App
Run the following command to create a new React app using Vite:
npx create-vite@latest github-user-finder --template react
cd github-user-finder
npm install

Alternatively, if using Create React App: (not recommended)
npx create-react-app github-user-finder
cd github-user-finder
npm install


Step 2: Folder Structure
Create the following folder structure:
github-user-finder/
│── src/
│   ├── components/
│   │   ├── SearchBar.jsx       // User input field
│   │   ├── UserCard.jsx        // Displays user details
│   │   ├── Loader.jsx          // Loading state component
│   │   ├── ErrorMessage.jsx    // Displays errors
│   │   ├── RecentSearches.jsx  // Optional: Stores previous searches
│   │
│   ├── pages/
│   │   ├── Home.jsx            // Main page component
│   │
│   ├── hooks/
│   │   ├── useGitHubUser.js    // useEffect hook to fetch API data
│   │
│   ├── styles/
│   │   ├── app.css             // Global styles
│   │
│   ├── App.jsx                 // Root component
│   ├── main.jsx                // Entry point
│── public/
│── package.json
│── README.md


##🎯 Step 3: Build the Components
1️⃣ SearchBar Component (User Input)
Accepts user input
Calls the API when the "Search" button is clicked or Enter key is pressed
src/components/SearchBar.jsx


2️⃣ Loader Component (Loading State)

3️⃣ ErrorMessage Component (Error Handling)
src/components/ErrorMessage.jsx


4️⃣ UserCard Component (Display User Details)
src/components/UserCard.jsx

5️⃣ Custom Hook for API Call
src/hooks/useGitHubUser.js



6️⃣ Home Page (Integrating Everything)
src/pages/Home.jsx


7️⃣ App Component (Main Entry)
src/App.jsx

📌 Step 4: Run & Test the Application
Start the React app:
npm run dev  # For Vite
npm start    # For Create React App

Open http://localhost:5173/ (Vite) or http://localhost:3000/ (CRA) in your browser.

💡 Bonus Features (Optional)
Save search history in localStorage
Show top repositories of the user
Improve UI using Chakra UI or Tailwind CSS
Debounce input to avoid unnecessary API calls
Paginate repositories using GitHub API

📝 Submission Guidelines
Submit a GitHub repository link with the working code.
Deploy the project on Vercel or Netlify and provide the live URL.
Ensure proper folder structure, code comments, and documentation.

🎯 Evaluation Criteria
✅ Correct API call implementation
✅ Proper use of useState and useEffect
✅ Handling of loading, error, and success states
✅ Code cleanliness and modularity
✅ Responsive and functional UI
