import React, { useState, useEffect } from 'react';

const SuccessStory = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Fetch success stories
    fetch('/api/success-stories') // Replace with actual API route
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  return (
    <div className="success-story-section">
      <h2 className="text-2xl font-bold text-center">Success Stories</h2>
      <div className="stories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            <img src={story.image} alt="Couple" className="rounded-md" />
            <div className="story-details">
              <p>Married on: {new Date(story.date).toLocaleDateString()}</p>
              <p>Review: {story.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStory;
