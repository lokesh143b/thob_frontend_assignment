import React, { useState, useEffect, useContext } from "react";
import "./FoodList.css";
import { AppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie" // Import js-cookie to handle cookies

const FoodList = () => {
  // State variables to manage food items, loading, and error states
  const [foodItems, setFoodItems] = useState([]); // Stores the list of food items
  const [isLoading, setIsLoading] = useState(true); // Controls loading spinner state
  const [error, setError] = useState(null); // Stores any error messages
  const { backend_url } = useContext(AppContext); // Access the backend URL from context
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch the food list when the component mounts
  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        // Send GET request to fetch food list
        const response = await fetch(backend_url + "/food/list", {
          method: "GET",
        });

        const data = await response.json(); // Parse the response JSON

        if (response.ok) {
          // If request is successful, store the food items in state
          setFoodItems(data.data);
        } else {
          // If there's an error in the response, set the error message
          setError(data.message || "Error fetching food list");
        }
      } catch (error) {
        // Catch any errors during fetch and set an error message
        setError("An error occurred while fetching food list");
      } finally {
        // Hide the loading spinner once the request is complete
        setIsLoading(false);
      }
    };

    fetchFoodList(); // Call the function to fetch food list
  }, []); // Empty dependency array to fetch data only once on mount

  // Handle logout by removing the token from cookies and navigating to login page
  const onClickLogout = () => {
    Cookies.remove("token"); // Remove token from cookies
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="food-list-container">
      {/* Add Food button redirects to add food page */}
      <button onClick={() => navigate("/add-food")}>Add Food</button>

      {/* Log Out button triggers the logout function */}
      <button onClick={onClickLogout}>Log Out</button>

      {/* Conditionally render content based on loading state, error state, or fetched data */}
      {isLoading ? (
        <p>Loading food items...</p> // Display loading text while fetching
      ) : error ? (
        <p>{error}</p> // Display error message if an error occurred
      ) : (
        <div className="food-list">
          {/* If no food items are available, display a message */}
          {foodItems.length === 0 ? (
            <p>No food items available</p>
          ) : (
            // Otherwise, map through the foodItems and display each food item
            foodItems.map((item) => (
              <div key={item._id} className="food-item">
                {/* Display food image */}
                <img
                  src={`${backend_url}/images/${item.image}`} // Construct the image URL
                  alt={item.name} // Use food item's name as alt text for the image
                  className="food-image"
                />
                <div className="food-details">
                  {/* Display food name, description, price, and category */}
                  <h3 className="food-name">{item.name}</h3>
                  <p className="food-description">{item.description}</p>
                  <p className="food-price">₹{item.price}</p>
                  <p className="food-category">{item.category}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default FoodList;
