import React, { useState, useEffect, useContext } from "react";
import "./AddItems.css";
import { assets } from "../../assets/admin_assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/Context";
import Cookies from "js-cookie"; // Import js-cookie to access cookies
import { useNavigate } from "react-router-dom";

const AddItems = () => {
  // State variables to store form data and loading state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // State for the image file
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const { backend_url } = useContext(AppContext); // Get backend URL from context
  const [isLoaderActive, setIsLoaderActive] = useState(false); // State to manage loading spinner
  const navigate = useNavigate(); // Use navigate hook for redirecting after submission

  // Cleanup image URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // Revoke URL to free memory
      }
    };
  }, [imagePreview]);

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update image file state
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL for the image
    }
  };

  // Handle form submission
  const submitForm = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Prepare URL for the API endpoint
    const url = backend_url + "/food/add";

    // Create FormData object to send multipart/form-data to the backend
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    if (image) {
      formData.append("image", image); // Add the image file to FormData
    }

    try {
      setIsLoaderActive(true); // Show loader
      const response = await fetch(url, {
        method: "POST", // Send POST request with form data
        body: formData,
      });

      // Handle response if successful
      if (response.ok) {
        const result = await response.json();
        toast.success(result.message); // Show success toast
        console.log(result);

        // Reset form inputs and loader state after successful submission
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage(null);
        setImagePreview(null); // Clear the preview
        setIsLoaderActive(false);
        navigate("/"); // Redirect to home page after successful item addition
      } else {
        // Handle errors if response is not OK
        const errorData = await response.json();
        setIsLoaderActive(false);
        console.error("Failed to add item:", errorData.message || "Unknown error");
        alert(`Failed to add item: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      // Handle errors that occur during fetch
      setIsLoaderActive(false);
      console.error("Error occurred while adding item:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <form onSubmit={submitForm} className="add-items-container">
      <ToastContainer /> {/* Toast notifications container */}

      {/* Loader Spinner when form is submitting */}
      {isLoaderActive ? (
        <div className="add-item-loader-container">
          <div className="loader-container">
            <div className="circular-loader"></div> {/* Circular loading spinner */}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Image upload section */}
      <div className="image-upload">
        <label htmlFor="ImageUpload">
          Upload image
          <img
            src={imagePreview || assets.upload_area} // Show preview if available, else default image
            alt="Preview"
            className="image-preview"
          />
        </label>
        <input
          id="ImageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange} // Handle image change
        />
      </div>

      {/* Product name input */}
      <div className="product-name">
        <label htmlFor="ProductName">Product name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)} // Handle name input change
          id="ProductName"
          type="text"
          placeholder="Type here..."
          required
        />
      </div>

      {/* Product description textarea */}
      <div className="product-description">
        <label htmlFor="ProductDescription">Product description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Handle description input change
          rows={5}
          id="ProductDescription"
          required
        ></textarea>
      </div>

      {/* Product category and price section */}
      <div className="product-cat-price">
        <div>
          <label htmlFor="category">Product category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Handle category selection change
            id="category"
            required
          >
            <option value="">- Select -</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwitch">Sandwitch</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            <option value="Drinks">Drinks</option>
            <option value="Milkshakes">Milkshakes</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Product price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Handle price input change
            id="price"
            type="number"
            placeholder="₹"
            required
          />
        </div>
      </div>

      {/* Submit button to add product */}
      <button type="submit" className="product-add">
        ADD
      </button>
    </form>
  );
};

export default AddItems;
