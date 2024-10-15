import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Animation.css"; // Import the CSS for animations

const Animation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the root route after 3 seconds
    const timer = setTimeout(() => {
      navigate("/"); // Navigate to the root route
    }, 4000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="mainanimation">
      <video className="video-large" muted autoPlay>
        <source src="./videos/mainanimayion.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video className="video-small" muted autoPlay>
        <source src="./videos/video-large" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Animation;
