import React from "react"; // Import React
import { Route, Routes } from "react-router-dom"; // Importing Route and Routes for routing
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute"; // Importing the ProtectedRoute component
import AddItems from "./Pages/AddItems/AddItems"; // Importing AddItems page
import Login from "./Pages/Login/Login"; // Importing Login page
import Signup from "./Pages/SignUp/SignUp"; // Importing Signup page
import FoodList from "./Pages/FoodList/FoodList"; // Importing FoodList page

const App = () => {
  return (
    <div>
      <Routes>
        {/* Protected route for adding food item */}
        <Route
          path="/add-food"
          element={
            <ProtectedRoute> {/* Only authenticated users can access this route */}
              <AddItems /> {/* Render the AddItems component */}
            </ProtectedRoute>
          }
        />

        {/* Protected route for viewing food list */}
        <Route
          path="/"
          element={
            <ProtectedRoute> {/* Only authenticated users can access this route */}
              <FoodList /> {/* Render the FoodList component */}
            </ProtectedRoute>
          }
        />

        {/* Route for login page */}
        <Route path="/login" element={<Login />} /> {/* Render the Login component */}

        {/* Route for signup page */}
        <Route path="/signup" element={<Signup />} /> {/* Render the Signup component */}
      </Routes>
    </div>
  );
};

export default App;
