
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import settingsIcon from '../../assets/settings.png';
import Settings from './Settings';


export default function Goal({goal}) {

    let navigate = useNavigate();

    const gotoFocusPage = (goalDescription) => {
        navigate(`/focus/${goalDescription}`);
      }

    const [showSettings, setShowSettings] = useState(false);

    const progressPercentage = ((goal.timeSpent / (goal.goalType * 60)) * 100).toFixed(2);
    const barWidth = `${progressPercentage}%`;

  return (
    <div className='goal'>
      <img className='settings-icon' src={settingsIcon} alt="Settings" onClick={() => setShowSettings(true)} />
      <div className='goal-descript'>{goal.goalDescription}</div>
      <div className='progress-container'>
        <div className='progress-bar' style={{ width: barWidth }} />
      </div>
      <div className='progress-percent'>{progressPercentage}%</div>
      <div className='enter-button' onClick={() => gotoFocusPage(goal.goalDescription)}>进入状态</div>
      {showSettings && <Settings onClose={() => setShowSettings(false)} goalDescript={goal.goalDescription} />}
    </div>
      )
}
