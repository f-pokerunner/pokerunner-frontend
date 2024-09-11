import { useState, useEffect } from 'react';

export function useExperiencePoll(
  pollInterval = 10000,
  initialMessage = '경험치가 상승했습니다!',
) {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const checkExperience = () => {
    // 여기에 실제 경험치 상승 체크 로직 필요
    // 현재는 임시로 5초 후에 팝업을 띄우는 코드
    setTimeout(() => {
      setMessage('경험치가 50 상승했습니다!');
      setShowPopup(true);
    }, 5000);
  };

  useEffect(() => {
    // 폴링 간격에 따라 경험치 체크
    const interval = setInterval(checkExperience, pollInterval);

    return () => clearInterval(interval);
  }, [pollInterval]);

  return { showPopup, setShowPopup, message };
}
