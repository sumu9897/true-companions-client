import React from 'react';

const SuccessCounter = () => {
  return (
    <div className="success-counter-section">
      <h2 className="text-2xl font-bold text-center">Our Achievements</h2>
      <div className="counters flex justify-around mt-4">
        <div>
          <h3 className="text-xl font-bold">500+</h3>
          <p>Total Biodata</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">300+</h3>
          <p>Male Biodata</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">200+</h3>
          <p>Female Biodata</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounter;
