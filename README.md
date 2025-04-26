Food Management App
This project is the frontend of a food management web application built with React.js. It provides features like user authentication (signup/login), viewing and adding food items, and managing the food list.

Features
User Authentication:

Signup and login functionality

Persistent user sessions with JWT

Protected routes that require authentication

Food Management:

Viewing the list of available food items

Adding new food items with images, descriptions, and pricing

Real-time loading and error handling when fetching food data

Responsive Design:

Mobile-friendly and responsive UI for food items and forms

Technologies
React.js: Frontend framework

React Router: For routing between pages

Context API: To manage global state such as the backend URL

JS Cookies: To manage authentication tokens stored in the user's browser

Toastify: To display notifications (success/error messages)

CSS: For styling the app components

Installation
Clone the repository
bash
Copy
Edit
git clone https://github.com/lokesh143b/thob_frontend_assignment
cd <project-folder>
Install dependencies
bash
Copy
Edit
npm install
Setup
Before running the application, you need to set up your environment:

Ensure the backend API is up and running. The frontend communicates with it for authentication and fetching food data.

Set the backend_url in your context or replace the URL placeholder in the code with the actual backend URL.

App Structure
The directory structure is as follows:

bash
Copy
Edit
src/
├── Pages/
│   ├── AddItems/            # Add food item component
│   ├── FoodList/            # Food list display component
│   ├── Login/               # Login form component
│   ├── Signup/              # Signup form component
├── context/                 # Context API for managing global state
├── assets/                  # Static assets like images
├── App.js                   # Main app component (Routing setup)
├── App.css                  # Global styles
Usage
Signup:

Navigate to the /signup route to create a new user account.

Login:

After signing up, navigate to the /login route to log in using your credentials.

Food List:

Upon successful login, you will be redirected to the / route where you can view the list of available food items.

Add Food Item:

Navigate to /add-food to add a new food item. You can upload an image, enter a name, description, category, and price for the item.

Styling
The app is styled using plain CSS. The styling files are located inside the src folder under the respective component directories (e.g., AddItems.css, FoodList.css).

Responsive Design: The app is designed to be mobile-friendly and adapts to different screen sizes.

Toast Notifications: Success and error messages are displayed using the react-toastify library for better user experience.
