# Infohub
A web application which scrapes latest news articles from web and present them in cards with headline and descriptions, whci hthe user can click on to visit the original articels, the user is also able to have a customer preference page where the user can choose what type of news the for example the user can chose to view eg tech, health, finance.


## Description

My News App is a web application built with Next.js and React. It features user authentication using Firebase, page transitions with Framer Motion, and a responsive UI. The app provides users with top stories, breaking news, and must-watch news articles.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and generating static websites.
- **React**: A JavaScript library for building user interfaces.
- **Firebase**: For authentication and Firestore as a database.
- **Framer Motion**: For animations and transitions.
- **React-Firebase-Hooks**: To manage Firebase authentication state.
- **Axios**: For making HTTP requests.
- **React Switch**: For toggle switches in the UI.

## Installation

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have npm and Node.js installed. You can download them from [Node.js](https://nodejs.org/).

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Navigate to the project directory
  ```bash
    cd your-repo-name
   ```
3. Install dependencies
 ```bash
    npm install
   ```
4. Set up Firebase:

- Create a Firebase project in the Firebase Console.
- Add a web app to your Firebase project.
- Copy the Firebase configuration object.

5. Create a firebase.js file in the src directory and add your Firebase configuration:
 ```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```
6. Set up environment variables:
-  Create a .env.local file in the root directory.
-  Add your News API key:
 ```bash
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key

```
## Usage
### Development
To run the application in development mode:
 ```bash
npm run dev

```
### Features
- Authentication
- User registration and login with Firebase.
- Protected routes using HOCs.
- Navigation
- Smooth page transitions using Framer Motion.
- Dynamic navigation based on authentication state.
- News Fetching
- Fetch and display top stories, breaking news, and must-watch news using Axios.
- Cache news data in local storage and refresh every 15 minutes.
- User Profile
- User profile management with Firebase.
- Contributing
- Contributions are what make the open-source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

### Fork the Project
- Create your Feature Branch (git checkout -b feature/AmazingFeature)
- Commit your Changes (git commit -m 'Add some AmazingFeature')
- Push to the Branch (git push origin feature/AmazingFeature)
- Open a Pull Request



## Instructions

### Replace placeholder text
   - Replace `https://github.com/your-username/your-repo-name.git` with the actual URL of your GitHub repository.
   - Replace `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, `YOUR_PROJECT_ID`, etc., with your actual Firebase configuration values.
   - Replace `your_news_api_key` with your actual News API key.




