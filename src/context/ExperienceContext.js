import React, { createContext, useContext, useState } from 'react';

const ExperienceContext = createContext();

export const ExperienceProvider = ({ children }) => {
  const [experience, setExperience] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const checkExperience = (newExperience) => {
    setExperience((prevExperience) => prevExperience + newExperience);
    setMessage(`경험치가 ${newExperience} 상승했습니다!`);
    setShowPopup(true);
  };

  return (
    <ExperienceContext.Provider
      value={{ experience, showPopup, setShowPopup, message, checkExperience }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  return useContext(ExperienceContext);
};
