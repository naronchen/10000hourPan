import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import '../../css/CountDownPage.css';

export default function CountDownPage() {

  const { goalDescription } = useParams();
  const [timeLeft, setTimeLeft] = useState(5); // Set the initial countdown time in seconds
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowModal(true);

      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to format time in HH:MM:SS
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}：${minutes.toString().padStart(2, '0')}：${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="countdown-container">
      {/* <div className='countdown-title'> 目标：{goalDescription}</div> */}
      <div className="countdown-timer">
        {formatTime(timeLeft)}
      </div>
        {showModal && <Modal onClose={handleCloseModal} />}
    </div>
  );
}
