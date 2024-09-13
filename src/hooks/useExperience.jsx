import { useState } from 'react';

export function useExperience() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const checkExperience = (experience) => {
    setMessage(`경험치가 ${experience} 상승했습니다!`);
    setShowPopup(true);
  };

  return { showPopup, setShowPopup, message, checkExperience };
}
