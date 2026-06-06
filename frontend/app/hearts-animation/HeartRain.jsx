import React, { useState, useEffect } from 'react';
import './HeartRain.css';

const HeartRain = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100, // Random horizontal position
        animationDuration: Math.random() * 3 + 2, // Fall speed between 2-5s
        size: Math.random() * 20 + 10, // Size between 10px-30px
      };
      
      setHearts((prevHearts) => [...prevHearts, newHeart]);

      // Remove heart from DOM after it falls to prevent memory leaks
      setTimeout(() => {
        setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id));
      }, 5000);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="heart-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="falling-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.animationDuration}s`,
            fontSize: `${heart.size}px`,
          }}
        >
          💛
        </div>
      ))}
    </div>
  );
};

export default HeartRain;